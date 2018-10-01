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
                options.User.RequireUniqueEmail = false;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();

            // Configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // Configure JWT authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
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
            services.AddSingleton<DatabaseSeeder, DatabaseSeeder>();
            //services.AddScoped<UserManager<User>, UserManager<User>>();
            //services.AddScoped<SignInManager<User>, SignInManager<User>>();


            // Register the Swagger generator
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = "An API",
                    Version = "v1",
                    Description = "An sample API using JWT authentication",
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
                //c.DocumentFilter<SecurityRequirementsDocumentFilter>();
            });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager
        )
        {
            if (env.IsDevelopment())
            {
                Task.Run(() => SeedRoles(roleManager)).Wait();
                Task.Run(() => SeedUsers(userManager)).Wait();
                app.UseDeveloperExceptionPage();
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

        private async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            // In Startup iam creating first Admin Role and creating a default Admin User    
            if (!await roleManager.RoleExistsAsync("Administrator"))
            {
                // first we create Admin rool   
                var role = new IdentityRole("Administrator");
                var result = await roleManager.CreateAsync(role);

            }
        }

        private async Task SeedUsers(UserManager<ApplicationUser> userManager)
        {
            userManager.PasswordValidators.Clear();
            userManager.UserValidators.Clear();

            //Here we create a Admin super user who will maintain the website                  
            var admin = new ApplicationUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                FirstName = "Bob",
                LastName = "Jones",
            };
            var adminResult = await userManager.CreateAsync(admin, "Password[1]");
            if (adminResult.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "Administrator");
            }

            var user = new ApplicationUser
            {
                UserName = "user@example.com",
                Email = "user@example.com",
                FirstName = "John",
                LastName = "Smith",
            };
            var userResult = await userManager.CreateAsync(user, "Password[1]");
        }
    }
}
