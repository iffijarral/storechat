export * from './auth';
export * from './store';
export * from './conversation';

// Generic Paginated Response if you use it often
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}