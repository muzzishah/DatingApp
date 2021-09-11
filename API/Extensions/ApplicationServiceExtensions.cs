using API.Data.Repositories;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}