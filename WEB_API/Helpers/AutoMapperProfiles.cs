﻿using AutoMapper;
using PropertyBrokerWebApp.Controllers;
using PropertyBrokerWebApp.DTOs;
using PropertyBrokerWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<Property, PropertyDetailDto>()
               .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
               .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
               .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
               .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));

            CreateMap<PropertyType, KeyValuePairDto>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDto>().ReverseMap();
            CreateMap<Property, PropertyDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();
        }
    }
}
