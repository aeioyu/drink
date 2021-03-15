import { IPagination } from '@/global/types/pagination.dto';
import { NotificationsService } from '@/notifications/notifications.service';
import { IInventoryAdjustmentItem } from '@/orders/types/orders.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventory } from './inventories.entity';
import { IInventory } from './types/inventories.dto';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoriesRepository: Repository<Inventory>,
    private configService: ConfigService,
    private notificationsService: NotificationsService,
  ) {}

  upsert(createInventory: IInventory): Promise<Inventory> {
    const inventory = new Inventory();
    inventory.machineId = createInventory.machineId;
    inventory.productId = createInventory.productId;
    inventory.qty = createInventory.qty;

    return this.inventoriesRepository.save(inventory);
  }

  upsertMulti(createInventories: IInventory[]): Promise<Inventory[]> {
    return this.inventoriesRepository.save(createInventories);
  }

  async findAllByMachineId(machineId, query): Promise<IPagination<Inventory[]>> {
    const { page, limit } = query;
    const [results, total] = await this.inventoriesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        machineId: machineId,
      },
      order: {
        productId: 'ASC',
      },
      relations: ['product'],
    });

    return {
      page: page,
      limit: limit,
      totals: total,
      items: results,
    };
  }

  findByProductIds(machineId: number, productIds: number[]): Promise<Inventory[]> {
    return this.inventoriesRepository.find({
      machineId: machineId,
      productId: In(productIds),
    });
  }

  batchUpdate(inventories: IInventory[]) {
    return this.inventoriesRepository.save(inventories);
  }

  async remove(machineId: number, productId: number): Promise<void> {
    await this.inventoriesRepository.delete({ machineId: machineId, productId: productId });
  }

  insufficientValidation(inventories: IInventoryAdjustmentItem[]) {
    const indicator = this.configService.get('INVENTORY_INDICATOR');
    const notificationEnable = this.configService.get('INVENTORY_NOTIFICATION');
    const productsLowerThanIndicator = inventories.filter(
      (inventory) => inventory.InStoreQty > indicator && inventory.toBeQty <= indicator,
    );

    const isNotificationRequired =
      notificationEnable === 'true' && productsLowerThanIndicator && productsLowerThanIndicator.length > 0;

    console.log({ isNotificationRequired, productsLowerThanIndicator });

    if (isNotificationRequired) {
      this.notificationsService.insufficientStockEmail(productsLowerThanIndicator);
      // this.notificationsService.appPushNotification(productsLowerThanIndicator);
    }
  }
}
