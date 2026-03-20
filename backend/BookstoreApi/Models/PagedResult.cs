namespace BookstoreApi.Models;

// Common pagination wrapper returned by the API.
// `totalCount` is used by React to calculate how many pages exist.
public sealed class PagedResult<T>
{
    public required int Page { get; init; }
    public required int PageSize { get; init; }
    public required int TotalCount { get; init; }
    public required IReadOnlyList<T> Items { get; init; }
}

