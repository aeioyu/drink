export class IPagination<T> {
  page: number;
  limit: number;
  totals: number;
  items: T;
}
