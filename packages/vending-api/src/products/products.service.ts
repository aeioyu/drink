import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/global/types/pagination.dto';
import { In, Repository } from 'typeorm';
import { Product } from './products.entity';
import { ICreateProduct, IUpdateProduct } from './types/products.dto';

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

  update(id: number, updateProduct: IUpdateProduct): Promise<Product> {
    const product = new Product();
    product.id = id;
    product.sku = updateProduct.sku;
    product.name = updateProduct.name;
    product.description = updateProduct.description;
    product.image = updateProduct.image;
    product.price = updateProduct.price;

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

  findOne(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  findByIds(ids: number[]): Promise<Product[]> {
    return this.productsRepository.find({
      id: In(ids),
    });
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
