using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.DataBase.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<RoomUser>()
                          .HasOne(ru => ru.User)
                          .WithMany(u => u.RoomUsers)
                          .HasForeignKey(ru => ru.UserId)
                          .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<RoomUser>()
                .HasOne(ru => ru.Room)
                .WithMany(r => r.RoomUsers)
                .HasForeignKey(ru => ru.RoomId)
                .OnDelete(DeleteBehavior.NoAction);





        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomUser> RoomUsers { get; set; }

    }
}