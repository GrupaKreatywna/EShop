using System.Threading.Tasks;

namespace Eshop.Core.CQRS
{
    public interface IQueryDispatcher
    {
        Task<TResult> Dispatch<TQuery, TResult>(TQuery query) where TQuery : IQuery;
    }
}
