using System;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Text;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using GenericRepository;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PACEWebApiCore.Api.Security;
using PACEWebApiCore.Api.Security.Interfaces;
using ReferenceDataCore;
using Serilog;
using SqlCodeGenerator;

namespace PACEWebApiCore.Api
{
    public class Startup
    {
        public static IConfigurationRoot Configuration { get; private set; }

        public static IContainer ApplicationContainer { get; private set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore()
                .AddJsonFormatters();

            ConfigureAuth(services);
            ConfigureCustomServices(services);

            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(ApplicationContainer);
        }

        private static void ConfigureCustomServices(IServiceCollection services)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.Populate(services);
            var connectionString = Configuration["connectionStrings:DatabaseContext"];
            containerBuilder.Register(c => new SqlConnection(connectionString)).As<IDbConnection>()
                .InstancePerLifetimeScope();
            //Generic Sql Generator
            containerBuilder.RegisterGeneric(typeof(SqlGenerator<>)).As(typeof(ISqlGenerator<>)).SingleInstance();
            //Generic Repository
            containerBuilder.RegisterGeneric(typeof(DataRepository<>)).As(typeof(IDataRepository<>));
            containerBuilder.RegisterType(typeof(AuthRepository)).As(typeof(IAuthRepository))
                .InstancePerLifetimeScope();
            containerBuilder.Register(r => new ReferenceService(connectionString)).As<IReferenceService>()
                .SingleInstance();
            ApplicationContainer = containerBuilder.Build();
        }

        private static void ConfigureAuth(IServiceCollection services)
        {
            services.AddAuthentication(IISDefaults.AuthenticationScheme)
                .AddMicrosoftAccount(options =>
                {
                    options.ClientId = Configuration["auth:microsoft:clientid"];
                    options.ClientSecret = Configuration["auth:microsoft:clientsecret"];
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration["auth:jwt:issuer"],
                        ValidAudience = Configuration["auth:jwt:audience"],
                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["auth:jwt:securitykey"]))
                    };
                });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (message, certificate2, arg3, arg4) => true
            };
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.EventCollector(
                    Configuration["Logging:SplunkEndpoint"],
                    Configuration["Logging:SplunkToken"],
                    source: Configuration["Logging:SplunkSource"],
                    index: Configuration["Logging:SplunkIndex"],
                    renderTemplate: false,
                    messageHandler: handler)
                .CreateLogger();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        // ensure generic 500 status code on fault.
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
                    });
                });
            }
            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}