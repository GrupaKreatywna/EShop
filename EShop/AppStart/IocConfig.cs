using Auth.FWT.Infrastructure.Logging;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Eshop.CQRS;
using System;
using Eshop.Core.CQRS;

namespace Eshop
{
    public class IocConfig
    {
        public static IContainer RegisterDependencies(IServiceCollection services)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            var builder = new ContainerBuilder();
            builder.Populate(services);

            builder.RegisterType<CommandDispatcher>().As<ICommandDispatcher>().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(ICommandHandler<>)).InstancePerLifetimeScope();

            builder.RegisterType<QueryDispatcher>().As<IQueryDispatcher>().InstancePerRequest().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(IQueryHandler<,>)).InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(AbstractValidator<>)).InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(IReadCacheHandler<,>)).InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(IWriteCacheHandler<,>)).InstancePerLifetimeScope();

            builder.Register(b => NLogLogger.Instance).SingleInstance().InstancePerLifetimeScope();

            return builder.Build();
        }
    }
}