namespace BookstoreApi.Models;

// Book model returned by the API.
// For this assignment, DTO and domain are the same shape so React can consume it directly.
public sealed class Book
{
    public required string Title { get; set; }
    public required string Author { get; set; }
    public required string Publisher { get; set; }
    public required string Isbn { get; set; }
    public required string Category { get; set; }
    public required int NumberOfPages { get; set; }
    public required decimal Price { get; set; }
}

