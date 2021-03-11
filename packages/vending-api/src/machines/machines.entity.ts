import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../global/entities/base.entity';

@Entity()
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  serialNo: string;

  @Column()
  location: string;

  @Column({ default: true })
  active: boolean;
}
