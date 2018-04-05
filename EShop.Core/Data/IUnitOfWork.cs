using Eshop.Core.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Eshop.Core.Data
{
    public interface IUnitOfWork : IDisposable
    {
        void Dispose(bool disposing);

        IRepository<TEntity, TKey> Repository<TEntity, TKey>() where TEntity : BaseEntity<TKey> where TKey : IComparable;

        int SaveChanges();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}