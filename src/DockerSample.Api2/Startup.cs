using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using DockerSample.Api.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using DockerSample.Api.Entities;
using DockerSample.Api.Settings;
using DockerSample.Api.Services;
using DockerSample.Api.Middleware;

namespace DockerSample.Api
{
    /// <summary>
    /// Application startup configuration.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initialises a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// Application configuration.
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddDbContext<DataContext>(x => x.UseInMemoryDatabase("TestDb"));

            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.User.RequireUniqueEmail = true;

                // Require only a minimum length of 10 characters for the password - no other rules.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 10;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAutoMapper();

            // Configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("Application");
            services.Configure<ApplicationSettings>(appSettingsSection);
            services.Configure<EmailSettings>(Configuration.GetSection("Email"));

            // Configure JWT authentication
            var appSettings = appSettingsSection.Get<ApplicationSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    //OnTokenValidated = context =>
                    //{
                    //    var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                    //    var userId = Guid.Parse(context.Principal.Identity.Name);
                    //    var user = userService.GetById(userId);
                    //    if (user == null)
                    //    {
                    //        // Return unauthorized if user no longer exists
                    //        context.Fail("Unauthorized");
                    //    }

                    //    return Task.CompletedTask;
                    //}
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Configure dependency resolver for application services
            services.AddScoped<DatabaseSeeder, DatabaseSeeder>();
            services.AddScoped<IEmailSender, EmailSender>();

            // Register the Swagger generator
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "An API",
                    Version = "v1",
                    Description = "A sample API using JWT authentication",
                    Contact = new Contact
                    {
                        Name = "Neil Cumpstey",
                    },
                });

                // Set the path to the xml documentation file so the Swagger generator can find it.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

                // Define JWT bearer token authorisation
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. Example: ""Authorization: Bearer {token}""",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey",
                });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
            });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            DatabaseSeeder databaseSeeder
        )
        {
            if (env.IsDevelopment())
            {
                // Seed database
                //var databaseSeeder = app.ApplicationServices.GetRequiredService<DatabaseSeeder>();
                Task.Run(() => databaseSeeder.SeedRolesAsync()).Wait();
                Task.Run(() => databaseSeeder.SeedUsersAsync()).Wait();

                app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Global CORS policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseAuthentication();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve the Swagger UI (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "An API v1");
            });

            app.UseMvc();
        }
    }
}
