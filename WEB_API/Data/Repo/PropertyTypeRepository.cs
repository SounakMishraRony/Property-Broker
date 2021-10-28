using Microsoft.EntityFrameworkCore;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Data.Repo
{
    internal class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext dc;

        public PropertyTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await dc.PropertyTypes.ToListAsync();
        }
    }
}