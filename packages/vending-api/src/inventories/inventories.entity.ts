import { Product } from 'src/products/products.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import BaseEntity from '../global/entities/base.entity';

@Entity()
@Unique('key', ['machineId', 'productId'])
export class Inventory extends BaseEntity {
  @PrimaryColumn()
  machineId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  qty: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: Product;
}
