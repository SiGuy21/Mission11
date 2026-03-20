import React, { useEffect, useMemo, useState } from 'react';
import type { BookDto, PagedResult } from '../types';
import { fetchBooks } from '../api/booksApi';

const pageSizeOptions = [5, 10, 15, 20];

// Displays a paginated catalog of books and allows sorting by title (A-Z / Z-A).
export default function BookList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const [data, setData] = useState<PagedResult<BookDto> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchBooks({ page, pageSize, sort: 'title', sortDir, signal: controller.signal })
      .then(setData)
      .catch((e) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, pageSize, sortDir]);

  const totalPages = data ? Math.max(1, Math.ceil(data.totalCount / data.pageSize)) : 1;

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);

    const start = Math.max(1, page - half);
    const end = Math.min(totalPages, start + windowSize - 1);

    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  }, [page, totalPages]);

  const toggleSortDir = () => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h1 className="h4 mb-2">Online Bookstore</h1>
          <div className="form-text">Sort by title and browse through the catalog.</div>
        </div>

        <div className="d-flex flex-wrap align-items-end gap-3">
          <div>
            <label className="form-label mb-1" htmlFor="pageSizeSelect">
              Results per page
            </label>
            <select
              id="pageSizeSelect"
              className="form-select form-select-sm"
              style={{ width: 140 }}
              value={pageSize}
              onChange={(e) => {
                setPage(1);
                setPageSize(Number(e.target.value));
              }}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button className="btn btn-outline-primary btn-sm" type="button" onClick={toggleSortDir}>
              Sort by Title: {sortDir === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading && <div className="text-muted">Loading...</div>}

      {!loading && data && (
        <>
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    type="button"
                    onClick={toggleSortDir}
                    aria-label="Sort by title"
                  >
                    Title {sortDir === 'asc' ? '▲' : '▼'}
                  </button>
                </th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
                <th scope="col">ISBN</th>
                <th scope="col">Category</th>
                <th scope="col">Pages</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((b) => (
                <tr key={b.isbn}>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.publisher}</td>
                  <td>{b.isbn}</td>
                  <td>{b.category}</td>
                  <td>{b.numberOfPages}</td>
                  <td>${b.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="text-muted">
              Page {page} of {totalPages} (Total books: {data.totalCount})
            </div>

            <nav aria-label="Book list pagination">
              <ul className="pagination mb-0">
                <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                  <button className="page-link" type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                    Prev
                  </button>
                </li>

                {visiblePages.map((p) => (
                  <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                    <button className="page-link" type="button" onClick={() => setPage(p)}>
                      {p}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

