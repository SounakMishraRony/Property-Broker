using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Data.Repo
{
    internal class FurnishingTypeRepository : IFurnishingTypeRepository
    {
        private readonly DataContext dc;

        public FurnishingTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<IEnumerable<FurnishingType>> GetFurnishingTypesAsync()
        {
            return await dc.FurnishingTypes.ToListAsync();
        }
    }
}