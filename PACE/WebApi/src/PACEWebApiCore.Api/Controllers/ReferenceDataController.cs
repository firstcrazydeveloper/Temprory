using System;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Utilities;
using ReferenceDataCore;
using Serilog;

namespace PACEWebApiCore.Api.Controllers
{
    [Route("/api/referencedata")]
    public class ReferenceDataController : Controller
    {
        private readonly IReferenceService _referenceService;

        public ReferenceDataController(IReferenceService referenceService)
        {
            _referenceService = referenceService;
        }

        [Route("getitem")]
        public IActionResult GetReferenceItem(string type, int id)
        {
            var referenceType = type.ToEnum<ReferenceType>();
            try
            {
                var item = _referenceService.GetByIdOrEmpty(referenceType, id);
                return Ok(item);
            }
            catch (Exception ex)
            {
                Log.Error("Error getting reference item {type} with identity {id}.", referenceType, id, ex.Message,
                    ex.StackTrace);
                return BadRequest("An error occured, please contact system administrator");
            }
        }

        [Route("getbytype")]
        public IActionResult GetReferenceType(string type, DateTime? contextDate = null)
        {
            var referenceType = type.ToEnum<ReferenceType>();
            try
            {
                var items = _referenceService.GetAll(referenceType, contextDate);

                return Ok(items);
            }
            catch (Exception ex)
            {
                Log.Error("Error getting reference type {type}", referenceType, ex.Message, ex.StackTrace);
                return BadRequest("An error occured, please contact system administrator");
            }
        }

        [Route("getbycode")]
        public IActionResult GetreferenceCode(string type, string code)
        {
            var referenceType = type.ToEnum<ReferenceType>();
            try
            {
                var item = _referenceService.GetByCode(referenceType, code);
                return Ok(item);
            }
            catch (Exception ex)
            {
                Log.Error("Error getting reference type {type} for code {code}", referenceType, code, ex.Message,
                    ex.StackTrace);
                return BadRequest("An error occured, please contact system administrator");
            }
        }

        [Route("getbydescription")]
        public IActionResult GetreferenceDescription(string type, string description)
        {
            var referenceType = type.ToEnum<ReferenceType>();
            try
            {
                var item = _referenceService.GetByCode(referenceType, description);
                return Ok(item);
            }
            catch (Exception ex)
            {
                Log.Error("Error getting reference type {type} for description {description}", referenceType,
                    description, ex.Message, ex.StackTrace);
                return BadRequest("An error occured, please contact system administrator");
            }
        }

        [Route("getbyflag")]
        public IActionResult GetreferenceFlag(string type, string flagName, bool flagValue = true,
            bool isActive = false, DateTime? contextDate = null)
        {
            var referenceType = type.ToEnum<ReferenceType>();
            try
            {
                var item = _referenceService.GetByFlag(referenceType, flagName, flagValue, isActive, contextDate);
                return Ok(item);
            }
            catch (Exception ex)
            {
                Log.Error("Error getting reference type {type} for flagName {flagName}", referenceType, flagName,
                    ex.Message, ex.StackTrace);
                return BadRequest("An error occured, please contact system administrator");
            }
        }
    }
}