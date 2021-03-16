import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IPaginationQuery } from 'src/global/types/pagination.dto';
import { ProductsService } from './products.service';
import { ICreateProduct, IUpdateProduct } from './types/products.dto';

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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Post()
  create(@Body() createProduct: ICreateProduct) {
    return this.productsService.create(createProduct);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProduct: IUpdateProduct) {
    return this.productsService.update(+id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
