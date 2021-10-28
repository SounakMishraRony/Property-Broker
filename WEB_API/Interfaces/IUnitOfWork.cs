using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepository cityRepository { get; }
        IUserRepository userRepository { get; }
        IPropertyRepository PropertyRepository { get; }
        IPropertyTypeRepository PropertyTypeRepository { get; }
        IFurnishingTypeRepository furnishingTypeRepository { get; }
        Task<bool> SaveAsync();
    }
}
