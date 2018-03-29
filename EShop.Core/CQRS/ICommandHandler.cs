using System.Threading.Tasks;

namespace Eshop.Core.CQRS
{
    public interface ICommandHandler<TCommand, TResult> where TCommand : ICommand
    {
        Task<TResult> Execute(TCommand command);
    }

    public interface ICommandHandler<TCommand> where TCommand : ICommand
    {
        Task Execute(TCommand command);
    }
}