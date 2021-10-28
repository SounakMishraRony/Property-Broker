using Microsoft.EntityFrameworkCore;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Data.Repo
{
    public class CityRespository : ICityRepository
    {
        private readonly DataContext dc;

        public CityRespository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.Cities.AddAsync(city);
        }

        public void DeleteCity(int cityId)
        {
            var city = dc.Cities.Find(cityId);
            dc.Cities.Remove(city);
        }

        public async Task<City> FindCity(int id)
        {
           return await dc.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }

    }
}
