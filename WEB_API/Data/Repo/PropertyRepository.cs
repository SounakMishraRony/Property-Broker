using Microsoft.EntityFrameworkCore;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext dc;

        public PropertyRepository( DataContext dc)
        {
            this.dc = dc;
        }
        public void AddProperty(Property property)
        {
            dc.Properties.Add(property);
        }

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRent)
        {
            return await dc.Properties.Include(t => t.PropertyType).Include(t =>t.City).Include(t => t.FurnishingType).Where(t => t.SellRent == sellRent).ToListAsync();
        }

        public async Task<Property> GetPropertyDetailAsync(int id)
        {
            return await dc.Properties.Include(t => t.PropertyType).Include(t => t.City).Include(t => t.FurnishingType).Where(t => t.SellRent == id).FirstOrDefaultAsync();
        }

        public async Task<Property> GetPropertyByIdAsync(int id)
        {
            return await dc.Properties.Include(t => t.Photos).Where(t => t.SellRent == id).FirstOrDefaultAsync();
        }
    }
}
