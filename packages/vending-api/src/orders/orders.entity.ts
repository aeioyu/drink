import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../global/entities/base.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  machineId: number;

  @Column({ type: 'float' })
  subTotals: number;

  @Column({ type: 'float', default: 0 })
  discount: number;

  @Column({ type: 'float' })
  grandTotals: number;

  @Column()
  paymentMethod: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: ['insert'] })
  items: OrderItem[];
}

@Entity()
export class OrderItem {
  @PrimaryColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  qty: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  totals: number;

  @ManyToOne(() => Order, (order) => order.items, { primary: true })
  order: Order;
}
