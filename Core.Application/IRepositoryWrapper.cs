using Core.Application.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application
{
    public interface IRepositoryWrapper
    {
        IUserRepository User { get; }

        void Save();
    }
}
