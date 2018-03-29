using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace PACEWebApiCore.Utilities
{
    public static class Utils
    {
        #region Hashing

        public static string Encrypt(this string encryptString, string key)
        {
            var clearbytes = Encoding.Unicode.GetBytes(encryptString);
            using (var encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(key, new byte[]
                {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (var memoryStream = new MemoryStream())
                {
                    using (var cryptoStream =
                        new CryptoStream(memoryStream, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cryptoStream.Write(clearbytes, 0, clearbytes.Length);
                        cryptoStream.Close();
                    }

                    encryptString = Convert.ToBase64String(memoryStream.ToArray());
                }
            }

            return encryptString;
        }

        public static string Decrypt(this string cipherText, string key)
        {
            cipherText = cipherText.Replace(" ", "+");
            var cipherBytes = Convert.FromBase64String(cipherText);
            using (var encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(key, new byte[]
                {
                    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
                });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (var memoryStream = new MemoryStream())
                {
                    using (var cryptoStream =
                        new CryptoStream(memoryStream, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cryptoStream.Write(cipherBytes, 0, cipherBytes.Length);
                        cryptoStream.Close();
                    }

                    cipherText = Encoding.Unicode.GetString(memoryStream.ToArray());
                }
            }

            return cipherText;
        }

        #endregion Hashing

        #region HttpClient

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static HttpContent RequestStringContent(this object entity)
        {
            var jsonString = JsonConvert.SerializeObject(entity);
            return new StringContent(jsonString, Encoding.UTF8, "application/json");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="endpoint"></param>
        /// <param name="credentials"></param>
        /// <param name="tokenString"></param>
        /// <returns></returns>
        public static string PostObjectAsJsonToTargetAction(this object entity, string endpoint,
            string credentials = null, string tokenString = null)
        {
            string result;

            using (var client = new HttpClient())
            {
                if (credentials != null)
                {
                    var basicAuthArray = Encoding.ASCII.GetBytes(credentials);
                    client.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Basic", Convert.ToBase64String(basicAuthArray));
                }

                if (tokenString != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer ", tokenString);
                }

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                using (var requestContent = entity.RequestStringContent())
                {
                    var uri = new Uri(endpoint);
                    //need proper fix for this 
                    //cannot accept all certificates
                    if (uri.Scheme == "https")
                    {
                        ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
                    }

                    using (var task = client.PostAsync(endpoint, requestContent))
                    {
                        using (var response = task.Result)
                        using (var content = response.Content)
                            result = content.ReadAsStringAsync().Result;
                    }
                }
            }

            return result;
        }

        #endregion HttpClient


        public static T? ToNullable<T>(this object obj) where T : struct
        {
            try
            {
                // Sanity
                if (obj == null)
                {
                    return null;
                }

                // Sanity special case- we don't want to convert empty strings to anything
                if (obj is string str && str.IsNullOrWhiteSpace())
                {
                    return null;
                }

                // Convert from passed type if possible
                var conv = TypeDescriptor.GetConverter(typeof(T));
                if (conv.CanConvertFrom(obj.GetType()))
                {
                    return (T?) conv.ConvertFrom(obj);
                }

                // Else convert from string representation of passed object
                return (T?) conv.ConvertFrom(obj.ToString());
            }
            catch
            {
                // Catch all exceptions and return null
                return null;
            }
        }

        #region String

        public static string ToBase64String(this string instance)
        {
            if (instance.IsNullOrEmpty())
                return instance;

            var encoding = new UTF8Encoding();
            return Convert.ToBase64String(encoding.GetBytes(instance));
        }

        public static string ForceEmptyAsNull(this string value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        public static string FromBase64String(this string instance)
        {
            if (instance.IsNullOrEmpty())
                return instance;

            var encoding = new UTF8Encoding();
            return encoding.GetString(Convert.FromBase64String(instance));
        }

        public static bool TryParse<T>(this string s, out T result)
        {
            try
            {
                // Get converter for type T and convert
                var converter = TypeDescriptor.GetConverter(typeof(T));
                result = (T) converter.ConvertFromString(s);
                return true;
            }
            catch
            {
                result = default(T);
                return false;
            }
        }

        public static string TrimComma(this string s)
        {
            return s.IsNullOrEmpty() ? s : s.Trim(',');
        }

        public static DateTime? GetDateTime(this string s)
        {
            DateTime date;
            if (DateTime.TryParse(s, out date))
            {
                return date;
            }

            return null;
        }

        public static int? GetInteger(this string s)
        {
            if (int.TryParse(s, out var integer))
            {
                return integer;
            }

            return null;
        }

        public static string Ellipsis(this string text, int maxLength = 100, string ellipsis = "...")
        {
            if (text.Length <= maxLength)
            {
                return text;
            }

            var pos = text.IndexOf(" ", maxLength, StringComparison.Ordinal);
            if (pos >= 0)
            {
                return text.Substring(0, pos) + ellipsis;
            }

            return text;
        }

        public static string Truncate(this string value, int maxLength)
        {
            if (value.IsNullOrEmpty())
            {
                return value;
            }

            return value.Length <= maxLength
                ? value
                : value.Substring(0, maxLength);
        }


        public static string GetDescription<T>(this T en) where T : struct
        {
            var type = en.GetType();

            var memInfo = type.GetMember(en.ToString());

            if (memInfo.Length <= 0)
            {
                return en.ToString();
            }

            var attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

            return attrs.Length > 0 ? ((DescriptionAttribute) attrs[0]).Description : en.ToString();
        }

        public static T ToEnum<T>(this string value) where T : struct
        {
            if (Enum.TryParse(value, true, out T tEnum))
            {
                return tEnum;
            }

            throw new ArgumentOutOfRangeException($"Unable to convert {value} to enum type {typeof(T).Namespace}");
        }

        public static string ToTitleCase(this string str)
        {
            if (str.IsNullOrEmpty())
            {
                return str;
            }

            // Create CultureInfo and TextInfo classes to use ToTitleCase method
            var cultureInfo = Thread.CurrentThread.CurrentCulture;
            var textInfo = cultureInfo.TextInfo;
            return textInfo.ToTitleCase(str);
        }

        public static bool IsNullOrWhiteSpace(this string instance)
        {
            return string.IsNullOrWhiteSpace(instance);
        }

        public static string ToPascalCase(this string source)
        {
            var result = string.Empty;
            string[] separators = {"_", " ", "/"};

            var words = source.ToLowerInvariant().Split(separators, StringSplitOptions.RemoveEmptyEntries);
            foreach (var word in words)
            {
                result += char.ToUpper(word[0]);
                result += word.Substring(1);
            }

            return result;
        }

        public static string ToCamelCase(this string source)
        {
            if (source == null || source.Length < 2) return source;
            var words = source.Split(new char[] { }, StringSplitOptions.RemoveEmptyEntries);
            var result = words[0].ToLower();
            for (var i = 1; i < words.Length; i++)
            {
                result += words[i].Substring(0, 1).ToUpper() + words[i].Substring(1);
            }

            return result;
        }

        public static bool IsNullOrEmpty(this string source)
        {
            return string.IsNullOrEmpty(source);
        }

        public static bool IsNotNullOrEmpty(this string source)
        {
            return !string.IsNullOrEmpty(source);
        }

        public static bool IsNotNullOrWhiteSpace(this string source)
        {
            return !string.IsNullOrWhiteSpace(source);
        }

        #endregion String

        public static dynamic ToDynamic(this object value)
        {
            IDictionary<string, object> expando = new ExpandoObject();
            foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(value.GetType()))
            {
                expando.Add(property.Name, property.GetValue(value));
            }

            return (ExpandoObject) expando;
        }

        #region Nullable<T>

        public static T? NullIf<T>(this T? nullable, T nullIfValue) where T : struct
        {
            return nullable?.NullIf(nullIfValue);
        }

        public static T? NullIf<T>(this T value, T nullIfValue) where T : struct
        {
            return value.Equals(nullIfValue)
                ? (T?) null
                : value;
        }

        #endregion Nullable<T>

        public static bool StringContains(this string source, string toCheck, StringComparison comparison)
        {
            return source != null && toCheck != null && source.IndexOf(toCheck, comparison) >= 0;
        }

        public static string ToXml<T>(this T obj)
        {
            var xmlSerialiser = new XmlSerializer(typeof(T));

            using (var writer = new StringWriter())
            {
                xmlSerialiser.Serialize(writer, obj);
                var xmlString = writer.ToString();
                return xmlString;
            }
        }

        #region IEnumerable<T>

        public static HashSet<T> ToHashSet<T>(this IEnumerable<T> items)
        {
            return new HashSet<T>(items);
        }

        /// <summary>
        ///  default seperator = ","
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="items"></param>
        /// <param name="separator"></param>
        /// <returns></returns>
        public static string ToCsv<T>(this IEnumerable<T> items, string separator = null)
        {
            if (items == null)
            {
                return null;
            }

            var itemList = items.ToList();
            if (!itemList.Any())
            {
                return null;
            }

            separator = separator ?? ",";
            var sb = new StringBuilder();
            foreach (object item in itemList)
            {
                sb.AppendFormat("{0}{1}", item, separator);
            }

            if (itemList.Count > 1)
            {
                sb.Remove(sb.Length - separator.Length, separator.Length);
            }

            return sb.ToString();
        }

        public static void RemoveDuplicates<T>(this List<T> list)
            where T : IComparable<T>
        {
            list.Sort();
            for (var i = list.Count - 1; i > 0; i--)
            {
                if (!list[i].Equals(list[i - 1]))
                {
                    continue;
                }

                list.RemoveAt(i);
            }
        }

        #endregion IEnumerable<T>

        #region Linq Overloads

        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector)
        {
            return source.DistinctBy(keySelector, EqualityComparer<TKey>.Default);
        }

        public static IEnumerable<TSource> DistinctBy<TSource, TKey>
        (this IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector,
            IEqualityComparer<TKey> comparer)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            if (keySelector == null)
            {
                throw new ArgumentNullException(nameof(keySelector));
            }

            if (comparer == null)
            {
                throw new ArgumentNullException(nameof(comparer));
            }

            return DistinctByImpl(source, keySelector, comparer);
        }

        private static IEnumerable<TSource> DistinctByImpl<TSource, TKey>
        (IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector,
            IEqualityComparer<TKey> comparer)
        {
            var knownKeys = new HashSet<TKey>(comparer);
            return source.Where(element => knownKeys.Add(keySelector(element)));
        }

        public static bool Contains(this IEnumerable<string> strings, string value, StringComparison comparisonType)
        {
            if (strings == null)
            {
                throw new ArgumentNullException(
                    $"Extension method [bool Contains(IEnumerable<string>, string, StringComparison)] passed null this parameter");
            }

            return strings.Any(s => s.Equals(value, comparisonType));
        }

        public static IEnumerable<TSource> Except<TSource>(this IEnumerable<TSource> first,
            IEnumerable<TSource> second, Func<TSource, TSource, bool> comparer)
        {
            return first.Except(second, new LambdaComparer<TSource>(comparer));
        }

        public static bool SequenceEqual<TSource>(this IEnumerable<TSource> first, IEnumerable<TSource> second,
            Func<TSource, TSource, bool> comparer)
        {
            return first.SequenceEqual(second, new LambdaComparer<TSource>(comparer));
        }

        #endregion Linq Overloads

        #region Helper Classes

        /// <summary>
        /// Allows creation of an IEqualityComparer using a lambda expression.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public class LambdaComparer<T> : IEqualityComparer<T>
        {
            private readonly Func<T, T, bool> _lambdaComparer;
            private readonly Func<T, int> _lambdaHash;

            /// <summary>
            /// Initializes a new instance of the <see cref="LambdaComparer&lt;T&gt;"/> class.
            /// </summary>
            /// <param name="lambdaComparer">The lambda comparer.</param>
            public LambdaComparer(Func<T, T, bool> lambdaComparer)
                : this(lambdaComparer, o => o.GetHashCode())
            {
            }

            /// <summary>
            /// Initializes a new instance of the <see cref="LambdaComparer&lt;T&gt;"/> class.
            /// </summary>
            /// <param name="lambdaComparer">The lambda comparer.</param>
            /// <param name="lambdaHash">The lambda hash.</param>
            public LambdaComparer(Func<T, T, bool> lambdaComparer, Func<T, int> lambdaHash)
            {
                _lambdaComparer = lambdaComparer ?? throw new ArgumentNullException(nameof(lambdaComparer));
                _lambdaHash = lambdaHash ?? throw new ArgumentNullException(nameof(lambdaHash));
            }

            /// <summary>
            /// Equalses the specified x.
            /// </summary>
            /// <param name="x">The x.</param>
            /// <param name="y">The y.</param>
            /// <returns></returns>
            public bool Equals(T x, T y)
            {
                return _lambdaComparer(x, y);
            }

            /// <summary>
            /// Returns a hash code for this instance.
            /// </summary>
            /// <param name="obj">The obj.</param>
            /// <returns>
            /// A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table. 
            /// </returns>
            public int GetHashCode(T obj)
            {
                return _lambdaHash(obj);
            }
        }

        #endregion
    }
}