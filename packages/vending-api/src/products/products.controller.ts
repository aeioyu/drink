import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { IPaginationQuery } from 'src/global/types/pagination.dto';
import { ProductsService } from './products.service';
import { ICreateProduct } from './types/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  fineAll(@Query() query: IPaginationQuery) {
    return this.productsService.findAll({
      limit: query.hasOwnProperty('limit') ? +query.limit : 10,
      page: query.hasOwnProperty('page') ? +query.page : 1,
    });
  }

  @Post()
  create(@Body() createProduct: ICreateProduct) {
    return this.productsService.create(createProduct);
  }
}
