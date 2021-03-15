export interface IPagination<T> {
  limit: number;
  page: number;
  totals: number;
  items: T[];
}
