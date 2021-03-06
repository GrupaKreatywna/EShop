using Eshop.Core.Data;
using Eshop.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Eshop.Core.Extensions;
using System;
using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using EShop.Core.Entities;

namespace Eshop.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        private bool _disposed;

        private Hashtable _repositories;

        public UnitOfWork(DbContext context)
        {
            _context = context;
        }

        public IRepository<Product, int> ProductRepository
        {
            get
            {
                return Repository<Product, int>();
            }
        }

        public IRepository<Category, int> CategoryRepository
        {
            get
            {
                return Repository<Category, int>();
            }
        }

        public IRepository<Order, int> OrderRepository
        {
            get
            {
                return Repository<Order, int>();
            }
        }
                
        public IRepository<DiscountCoupon, int> DiscountCouponRepository
        {
            get
            {
                return Repository<DiscountCoupon, int>();
            }
        }

        public IRepository<Price, int> PriceRepository
        {
            get
            {
                return Repository<Price, int>();
            }
        }

        public IRepository<User, int> UserRepository
        {
            get
            {
                return Repository<User, int>();
            }
        }

        public IRepository<OrderProduct, int> OrderProductsRepository
        {
            get
            {
                return Repository<OrderProduct, int>();
            }
        }

        public void BeginTransaction()
        {
            //_context.BeginTransaction();
        }

        public int Commit()
        {
            //return _context.Commit();
            return 1;
        }

        public Task<int> CommitAsync()
        {
            return null;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _context.Dispose();
                if (_repositories != null)
                {
                    foreach (IDisposable repository in _repositories.Values)
                    {
                        repository.Dispose();
                    }
                }
            }

            _disposed = true;
        }

        public IRepository<TEntity, TKey> Repository<TEntity, TKey>()
            where TEntity : BaseEntity<TKey>
            where TKey : IComparable
        {
            if (_repositories.IsNull())
            {
                _repositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;
            if (_repositories.ContainsKey(type))
            {
                return (IRepository<TEntity, TKey>)_repositories[type];
            }

            var repositoryType = typeof(EntityRepository<,>);
            _repositories.Add(type, Activator.CreateInstance(repositoryType.MakeGenericType(new Type[] { typeof(TEntity), typeof(TKey) }), _context));
            return (IRepository<TEntity, TKey>)_repositories[type];
        }

        public void Rollback()
        {
           
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken)
        {
            return _context.SaveChangesAsync(cancellationToken);
        }
    }
}