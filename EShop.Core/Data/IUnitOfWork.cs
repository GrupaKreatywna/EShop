using Eshop.Core.Entities;
using EShop.Core.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Eshop.Core.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Product, int> ProductRepository { get; }
        IRepository<Order,int> OrderRepository { get; }
        IRepository<DiscountCoupon, int> DiscountCouponRepository { get; }
        IRepository<Category, int> CategoryRepository { get; }
        IRepository<Price, int> PriceRepository { get; }
        IRepository<User, int> UserRepository { get; }
        IRepository<OrderProduct, int> OrderProductsRepository { get; }
        void BeginTransaction();

        int Commit();

        Task<int> CommitAsync();

        void Dispose(bool disposing);

        IRepository<TEntity, TKey> Repository<TEntity, TKey>() where TEntity : BaseEntity<TKey> where TKey : IComparable;

        void Rollback();

        int SaveChanges();

        Task<int> SaveChangesAsync();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}