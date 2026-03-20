using BookstoreApi.Data;
using BookstoreApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookstoreApi.Controllers;

// Exposes API endpoints under `/api/*` for the React frontend.
[ApiController]
[Route("api/[controller]")]
public sealed class BooksController : ControllerBase
{
    private readonly IBookRepository _repository;

    public BooksController(IBookRepository repository)
    {
        _repository = repository;
    }

    // GET /api/books?page=1&pageSize=5&sort=title&sortDir=asc|desc
    // Assignment requirement: only support sorting by title.
    [HttpGet]
    public async Task<ActionResult<PagedResult<BookDto>>> GetBooks(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 5,
        [FromQuery] string sort = "title",
        [FromQuery] string sortDir = "asc",
        CancellationToken cancellationToken = default)
    {
        // Defensive validation so React can't request unsupported sorts.
        if (!string.Equals(sort, "title", StringComparison.OrdinalIgnoreCase))
            return BadRequest("Only sort='title' is supported for this assignment.");

        try
        {
            bool desc;
            if (string.Equals(sortDir, "desc", StringComparison.OrdinalIgnoreCase))
                desc = true;
            else if (string.Equals(sortDir, "asc", StringComparison.OrdinalIgnoreCase))
                desc = false;
            else
                return BadRequest("sortDir must be either 'asc' or 'desc'.");

            // Repository does the actual SQL + pagination against Bookstore.sqlite.
            var result = await _repository.GetBooksAsync(page, pageSize, desc, cancellationToken);
            return Ok(result);
        }
        catch (ArgumentOutOfRangeException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

