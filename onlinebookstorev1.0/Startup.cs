using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using onlinebookstorev1._0.Controllers.services;
using onlinebookstorev1._0.Modals;
using Serilog;
using System;
using System.Threading.Tasks;

namespace onlinebookstorev1._0
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(configuration)
        .CreateLogger();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // To getrid of cycle in entity 
            services.AddControllers().AddNewtonsoftJson(option => option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
           // configration of cors (cross orgin resource sharing)
            services.AddCors(option => option.AddPolicy("AllowOrigin", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
            // configration of entiity framework core to communicate with  data base

            services.AddDbContextPool<BookstoreContext>(option =>
            {
                option.UseSqlServer(Configuration.GetConnectionString("bookStore"));
            });
            // Adding Identity to preform auth
            services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<BookstoreContext>().AddDefaultTokenProviders();
           
            //token validation time period
            services.Configure<DataProtectionTokenProviderOptions>(option =>
            {
                option.TokenLifespan = TimeSpan.FromHours(1);
            });
            
            //Configration of identity options
            services.Configure<IdentityOptions>(option =>
            {
                option.SignIn.RequireConfirmedEmail = true;
            });
            services.ConfigureApplicationCookie(option => {
                option.Cookie.Name = "logincookies";
                option.ExpireTimeSpan = TimeSpan.FromHours(6);
                option.LoginPath = "/Login";

            });

            // In production, the React files will be served from this directory

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            
            app.UseSerilogRequestLogging();
            app.UseRouting();
            app.UseCors("AllowOrigin");
            
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
