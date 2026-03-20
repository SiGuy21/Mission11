// Program entry point for the BookstoreApi ASP.NET Core app.
// Wires up controllers, CORS for React dev, and dependency injection for the SQLite repository.
using System.Globalization;
using BookstoreApi.Data;
using BookstoreApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<BookstoreSchemaMapper>();
builder.Services.AddScoped<IBookRepository, SqliteBookRepository>();

var app = builder.Build();

app.UseCors();

app.MapControllers();

app.Run();

