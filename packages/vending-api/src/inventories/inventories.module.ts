import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventories.entity';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from '@/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), ConfigModule, NotificationsModule],
  providers: [InventoriesService],
  controllers: [InventoriesController],
  exports: [InventoriesService],
})
export class InventoriesModule {}
