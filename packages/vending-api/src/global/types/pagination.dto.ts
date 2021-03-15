import { IsNumberString } from "class-validator";

export class IPagination<T> {
  page: number;
  limit: number;
  totals: number;
  items: T;
}

export class IPaginationQuery {
  @IsNumberString()
  page: number;

  @IsNumberString()
  limit: number;
}
