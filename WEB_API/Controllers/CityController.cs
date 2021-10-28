using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
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
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        
        //Get api/cities
        [HttpGet("cities")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.cityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            //var citiesDto = from c in cities
            //                select new CityDto
            //                {
            //                    Id = c.Id,
            //                    Name = c.Name
            //                };
            return Ok(citiesDto);
        }

        //post city/post  --post data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCities(CityDto cityDto)
        {
            var newCity = mapper.Map<City>(cityDto);
            newCity.LastUpdatedBy=1;
            newCity.LastUpdatedOn = DateTime.Now;
            //var newCity = new City
            //{
            //    Name = cityDto.Name,
            //    LastUpdatedBy = "sounak",
            //    LastUpdatedOn = DateTime.Now
            //};
            uow.cityRepository.AddCity(newCity);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        //Delete city/delete  --delete data from db
        [HttpDelete ("delete/{id}")]
        public async Task<IActionResult> DeleteCities(int id)
        {
            uow.cityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
            var cityFromDb = await uow.cityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpPatch ("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id,JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await uow.cityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            cityToPatch.ApplyTo(cityFromDb,ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }


        ////Post City/add?newCity=Miami
        //[HttpPost("add")]
        //[HttpPost("add/{cityname}")]
        //public async Task<IActionResult> AddCities(string newCity)
        //{
        //    City city = new City();
        //    city.Name = newCity;
        //    await repo.AddAsync(city);
        //    await dc.SaveChangesAsync();
        //    return Ok(newCity);
        //}
    }
}
