using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PropertyBrokerWebApp.DTOs;
using PropertyBrokerWebApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Controllers
{
    public class PropertyTypeController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        //Get/api/propertytype/list
        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyTypes()
        {
            var types=await uow.PropertyTypeRepository.GetPropertyTypesAsync();
            var propertyTypes = mapper.Map<IEnumerable<KeyValuePairDto>>(types);
            return Ok(propertyTypes);
        }

    }
}
