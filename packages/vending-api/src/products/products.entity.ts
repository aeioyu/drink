import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../global/entities/base.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ default: true })
  active: boolean;
}
