import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../global/entities/base.entity';

@Entity()
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Vending Machine' })
  name: string;

  @Column({ unique: true })
  serialNo: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ default: true })
  active: boolean;
}
