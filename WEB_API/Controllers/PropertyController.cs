﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyBrokerWebApp.DTOs;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Controllers
{
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public PropertyController(IUnitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.photoService = photoService;
        }
        //property/list/2
        [HttpGet("list/{sellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(sellRent);
            var propertyListDto = mapper.Map<IEnumerable<PropertyListDto>>(properties);
            return Ok(propertyListDto);

        }
        //property/detail/2
        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetail(int id)
        {
            var property = await uow.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyDto = mapper.Map<PropertyDetailDto>(property);
            return Ok(propertyDto);

        }

        //property/add
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = mapper.Map<Property>(propertyDto);
            var UserId = GetUserId();
            property.PostedBy = UserId;
            property.LastUpdatedBy = UserId;
            uow.PropertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        //property/add/photo/1
        [HttpPost("add/photo/{propId}")]
        [Authorize]
        public async Task<IActionResult> AddPropertyPhoto(IFormFile file, int propId)
        {
            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null)
                return BadRequest(result.Error.Message);

            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);
            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if(property.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }
            property.Photos.Add(photo);
            await uow.SaveAsync();
            return StatusCode(201);
        }
    }
}
