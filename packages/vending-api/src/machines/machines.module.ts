import { Module } from '@nestjs/common';
import { MachinesController } from './machines.controller';
import { MachinesService } from './machines.service';
import { Machine } from './machines.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoriesModule } from '@/inventories/inventories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Machine]), InventoriesModule],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}
