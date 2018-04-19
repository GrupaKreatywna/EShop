using Eshop.Core.Data;
using Eshop.Data;
using Eshop.Infrastructure.Logging;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Eshop.CQRS;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Eshop.Core.CQRS;
using System;
using Microsoft.Extensions.Configuration;
using EShop.Infrastructure.Redis;
using StackExchange.Redis;

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
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(ICommandHandler<,>)).InstancePerLifetimeScope();

            builder.RegisterType<QueryDispatcher>().As<IQueryDispatcher>().InstancePerRequest().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(IQueryHandler<,>)).InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(AbstractValidator<>)).InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(IReadCacheHandler<,>)).InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(assemblies).AsClosedTypesOf(typeof(IWriteCacheHandler<,>)).InstancePerLifetimeScope();

            builder.RegisterType<Eshop.Data.DataContext>().As<IEntitiesContext>().InstancePerLifetimeScope();
            builder.RegisterType<Eshop.Data.DataContext>().As<DbContext>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(EntityRepository<,>)).As(typeof(IRepository<,>)).InstancePerLifetimeScope();
            builder.RegisterType(typeof(UnitOfWork)).As(typeof(IUnitOfWork)).InstancePerLifetimeScope();

            builder.Register(b => NLogLogger.Instance).SingleInstance().InstancePerLifetimeScope();

            builder.Register(b =>
            {
                var configuration = b.Resolve<IConfiguration>();
                return configuration.GetSection("RedisConfiguration").Get<RedisConnection>();
            }).SingleInstance();

            builder.Register(b =>
            {
                var redis = b.Resolve<RedisConnection>();
                return ConnectionMultiplexer.Connect(redis.RedisConfiguration);
            }).SingleInstance();

            builder.Register(b =>
            {
                var redis = b.Resolve<ConnectionMultiplexer>();
                return redis.GetDatabase();
            }).InstancePerLifetimeScope();

            return builder.Build();
        }
    }
}