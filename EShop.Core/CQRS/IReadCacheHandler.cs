using System.Threading.Tasks;
using Eshop.Core.CQRS;

namespace Eshop.Core.CQRS
{
    public interface IReadCacheHandler<TQuery, TResult> : ICacheKey<TQuery>
    {
        Task<TResult> Read(TQuery query);
    }
}