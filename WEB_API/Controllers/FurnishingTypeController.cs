using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PropertyBrokerWebApp.Data;
using PropertyBrokerWebApp.DTOs;
using PropertyBrokerWebApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Controllers
{
    public class FurnishingTypeController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FurnishingTypeController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        //Get/api/furnishingType/list
        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFurnishingTypes()
        {
            var types =await uow.furnishingTypeRepository.GetFurnishingTypesAsync();
            var furnishingTypes = mapper.Map<IEnumerable<KeyValuePairDto>>(types);
            return Ok(furnishingTypes);
        }

    }
}
