import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventories.entity';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [InventoriesService],
  controllers: [InventoriesController],
})
export class InventoriesModule {}
