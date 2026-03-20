namespace BookstoreApi.Models;

// Holds the mapping from "assignment field names" to actual SQLite column names.
public sealed class BookSchemaMapping
{
    public required string TableName { get; init; }

    // Column names
    public required string TitleColumn { get; init; }
    public required string AuthorColumn { get; init; }
    public required string PublisherColumn { get; init; }
    public required string IsbnColumn { get; init; }
    public required string CategoryColumn { get; init; }
    public required string NumberOfPagesColumn { get; init; }
    public required string PriceColumn { get; init; }
}

