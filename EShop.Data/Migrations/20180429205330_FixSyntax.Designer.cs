﻿// <auto-generated />
using Eshop.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace EShop.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20180429205330_FixSyntax")]
    partial class FixSyntax
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EShop.Core.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CategoryName");

                    b.Property<int?>("ParentId");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("EShop.Core.Entities.DiscountCoupon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CouponCode");

                    b.Property<string>("Name");

                    b.Property<DateTime>("ValidationEnd");

                    b.Property<DateTime>("ValidationStart");

                    b.HasKey("Id");

                    b.ToTable("DiscountCoupons");
                });

            modelBuilder.Entity("EShop.Core.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("City");

                    b.Property<string>("ContractingAuthority");

                    b.Property<int?>("DiscountCouponId");

                    b.Property<DateTime>("OrderDate");

                    b.Property<string>("PostalCode");

                    b.HasKey("Id");

                    b.HasIndex("DiscountCouponId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("EShop.Core.Entities.OrderProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("OrderId");

                    b.Property<int>("ProductId");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderProduct");
                });

            modelBuilder.Entity("EShop.Core.Entities.Price", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.Property<decimal>("Value");

                    b.HasKey("Id");

                    b.ToTable("Prices");
                });

            modelBuilder.Entity("EShop.Core.Entities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<int?>("CurrentPriceId");

                    b.Property<string>("Description");

                    b.Property<string>("Picture");

                    b.Property<string>("Name");

                    b.Property<int>("Count");

                    b.Property<string>("Tags");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CurrentPriceId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("EShop.Core.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<string>("Surname");

                    b.Property<bool>("Verified");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EShop.Core.Entities.Category", b =>
                {
                    b.HasOne("EShop.Core.Entities.Category", "Parent")
                        .WithMany()
                        .HasForeignKey("ParentId");
                });

            modelBuilder.Entity("EShop.Core.Entities.Order", b =>
                {
                    b.HasOne("EShop.Core.Entities.DiscountCoupon", "DiscountCoupon")
                        .WithMany("Orders")
                        .HasForeignKey("DiscountCouponId");
                });

            modelBuilder.Entity("EShop.Core.Entities.OrderProduct", b =>
                {
                    b.HasOne("EShop.Core.Entities.Order", "Order")
                        .WithMany("OrderProducts")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EShop.Core.Entities.Product", "Product")
                        .WithMany("OrderProducts")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EShop.Core.Entities.Product", b =>
                {
                    b.HasOne("EShop.Core.Entities.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EShop.Core.Entities.Price", "CurrentPrice")
                        .WithMany("Products")
                        .HasForeignKey("CurrentPriceId");
                });
#pragma warning restore 612, 618
        }
    }
}
