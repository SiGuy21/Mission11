import type { BookDto, PagedResult } from '../types';

// Small API client for the bookstore backend.
const getApiBaseUrl = (): string => {
  // If you use Vite proxy, you can just call relative /api/... and omit this.
  return import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';
};

export async function fetchBooks(params: {
  page: number;
  pageSize: number;
  sort: 'title';
  sortDir: 'asc' | 'desc';
  signal?: AbortSignal;
}): Promise<PagedResult<BookDto>> {
  const baseUrl = getApiBaseUrl();

  // Backend query params:
  // - page/pageSize control pagination
  // - sort + sortDir control ordering by title
  const url = new URL('/api/books', baseUrl);
  url.searchParams.set('page', String(params.page));
  url.searchParams.set('pageSize', String(params.pageSize));
  url.searchParams.set('sort', params.sort);
  url.searchParams.set('sortDir', params.sortDir);

  const res = await fetch(url.toString(), { method: 'GET', signal: params.signal });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed (${res.status})`);
  }

  return (await res.json()) as PagedResult<BookDto>;
}

