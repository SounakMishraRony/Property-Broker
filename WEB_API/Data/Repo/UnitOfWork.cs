using PropertyBrokerWebApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Data.Repo
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public ICityRepository cityRepository => new CityRespository(dc);

        public IUserRepository userRepository =>  new UserRepository(dc);

        public IPropertyRepository PropertyRepository =>  new PropertyRepository(dc);

        public IPropertyTypeRepository PropertyTypeRepository => new PropertyTypeRepository(dc);

        public IFurnishingTypeRepository furnishingTypeRepository => new FurnishingTypeRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
