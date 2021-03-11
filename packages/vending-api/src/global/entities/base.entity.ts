import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

abstract class BaseEntity {
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  createAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone', onUpdate: 'NOW()', nullable: true })
  updateAt: string;
}

export default BaseEntity;
