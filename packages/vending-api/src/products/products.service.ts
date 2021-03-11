import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/global/types/pagination.dto';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { ICreateProduct } from './types/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProduct: ICreateProduct): Promise<Product> {
    const product = new Product();
    product.sku = createProduct.sku;
    product.name = createProduct.name;
    product.description = createProduct.description;
    product.image = createProduct.image;
    product.price = createProduct.price;

    return this.productsRepository.save(product);
  }

  async findAll(query): Promise<IPagination<Product[]>> {
    const { page, limit } = query;
    const [results, total] = await this.productsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      page: page,
      limit: limit,
      totals: total,
      items: results,
    };
  }
}
