using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using PropertyBrokerWebApp.Data;
using PropertyBrokerWebApp.Data.Repo;
using PropertyBrokerWebApp.Extensions;
using PropertyBrokerWebApp.Helpers;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Services;
using System;
using System.Text;

namespace PropertyBrokerWebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new SqlConnectionStringBuilder(Configuration.GetConnectionString("Default"));
            builder.Password = Configuration.GetSection("DBPassword").Value;
            var connectionString = builder.ConnectionString;
            services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));
            services.AddControllers().AddNewtonsoftJson();
            services.AddCors();
            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddScoped<IPhotoService,PhotoService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            var secretKey = Configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        IssuerSigningKey = key
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.ConfigureExceptionHandler(env);

            app.UseRouting();

            app.UseHsts();

            app.UseHttpsRedirection();

            app.UseCors( m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
