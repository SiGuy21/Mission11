namespace BookstoreApi.Models;

// JSON-serialized DTO returned by the API.
// Property names are emitted in camelCase so the React types can match them naturally.
public sealed class BookDto
{
    public required string Title { get; init; }
    public required string Author { get; init; }
    public required string Publisher { get; init; }
    public required string Isbn { get; init; } // Stored as string so ISBN formatting (dashes/leading zeros) is preserved.
    public required string Category { get; init; }
    public required int NumberOfPages { get; init; }
    public required decimal Price { get; init; }
}

