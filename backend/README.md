# Mission #11 - Online Bookstore (ASP.NET Core API)

This project exposes an HTTP API for the `Bookstore.sqlite` database and returns paged book results for the React frontend.

## What this backend includes

- `Book` model/DTOs and a `PagedResult` wrapper
- SQLite repository that maps database rows to your `Book` model (title/author/publisher/isbn/category/pages/price)
- `GET /api/books` endpoint with:
  - pagination (`page`, `pageSize`)
  - sorting by title (`sort=title` + `sortDir=asc|desc`)

## Required file(s)

1. `Bookstore.sqlite` (prepopulated)

Place `Bookstore.sqlite` at the repository root:

- `./Bookstore.sqlite`

The API expects to find it at runtime via the app content root.

## Files created by this scaffold

- `backend/BookstoreApi/BookstoreApi.csproj`
- `backend/BookstoreApi/Program.cs`
- `backend/BookstoreApi/appsettings.json`
- `backend/BookstoreApi/Controllers/BooksController.cs`
- `backend/BookstoreApi/Data/IBookRepository.cs`
- `backend/BookstoreApi/Data/SqliteBookRepository.cs`
- `backend/BookstoreApi/Data/BookstoreSchemaMapper.cs`
- `backend/BookstoreApi/Models/Book.cs`
- `backend/BookstoreApi/Models/BookDto.cs`
- `backend/BookstoreApi/Models/BookSchemaMapping.cs`
- `backend/BookstoreApi/Models/PagedResult.cs`

## Run locally

From the `backend` folder:

```powershell
dotnet restore
dotnet run
```

Default URL in this scaffold:

- `http://localhost:5000`

## API usage

### List books (paged)

`GET /api/books?page=1&pageSize=5&sort=title&sortDir=asc`

Example:

```http
GET http://localhost:5000/api/books?page=2&pageSize=10&sort=title
```

Response (example shape):

```json
{
  "page": 2,
  "pageSize": 10,
  "totalCount": 23,
  "items": [
    {
      "title": "....",
      "author": "....",
      "publisher": "....",
      "isbn": "....",
      "category": "....",
      "numberOfPages": 123,
      "price": 12.34
    }
  ]
}
```

## Copilot prompt (copy/paste)

Use this if you want Copilot to generate or modify code in the backend.

```text
You are working in an ASP.NET Core Web API project for Mission #11 (IS 413 – Hilton).
I need a SQLite-backed online bookstore API for Bookstore.sqlite.

Requirements:
- Create a Book model with required fields: Title, Author, Publisher, ISBN, Category/Classification, NumberOfPages, Price.
- Implement a repository using Microsoft.Data.Sqlite.
- Since I want models to match the database tables, introspect the SQLite schema at runtime (sqlite_master + PRAGMA table_info)
  and map columns to my Book fields by matching likely column names case-insensitively.
- Provide GET /api/books with query params:
  - page (default 1)
  - pageSize (default 5)
  - sort (support "title" only; sort by Title)
  - sortDir (asc|desc)
- Return a paged result object: { page, pageSize, totalCount, items }.

Conventions:
- Use minimal DTOs.
- Enable CORS for localhost dev (React frontend).
- Keep it simple and robust; if schema mapping fails, return a clear error.
```

## React frontend (how it connects)

The React app calls the backend endpoint `GET /api/books`.

If you use the default Vite dev proxy in `frontend/vite.config.ts`, the React app can reach the API at `http://localhost:5000` without extra CORS setup.

If you call the API directly, set:

- `VITE_API_BASE_URL=http://localhost:5000`

To run the React frontend:

```powershell
cd frontend
npm install
npm run dev
```

