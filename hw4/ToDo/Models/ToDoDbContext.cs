using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ToDo.Models
{
    public partial class ToDoDbContext : DbContext
    {
        public ToDoDbContext()
        {
        }

        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Activity> Activity { get; set; } = null!;
        public virtual DbSet<User> User { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=hw4;password=hw4;database=hw4db", Microsoft.EntityFrameworkCore.ServerVersion.Parse("12.2.2-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_general_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Activity>(entity =>
            {
                entity.Property(e => e.Id).HasColumnType("int(10)");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.UserId).HasColumnType("int(10) unsigned zerofill");

                entity.Property(e => e.When).HasColumnType("datetime");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnType("int(10) unsigned zerofill")
                    .HasColumnName("id");

                entity.Property(e => e.FirstName).HasMaxLength(100);

                entity.Property(e => e.HashedPassword)
                    .HasMaxLength(44)
                    .IsFixedLength();

                entity.Property(e => e.LastName).HasMaxLength(100);

                entity.Property(e => e.NationalId)
                    .HasMaxLength(13)
                    .IsFixedLength();

                entity.Property(e => e.Salt)
                    .HasMaxLength(24)
                    .IsFixedLength();

                entity.Property(e => e.Title).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
