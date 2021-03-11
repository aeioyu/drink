import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/global/types/pagination.dto';
import { Repository } from 'typeorm';
import { Inventory } from './inventories.entity';
import { ICreateInventory } from './types/inventories.dto';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoriesRepository: Repository<Inventory>,
  ) {}

  create(createInventory: ICreateInventory): Promise<Inventory> {
    const inventory = new Inventory();
    inventory.machineId = createInventory.machineId;
    inventory.productId = createInventory.productId;
    inventory.qty = createInventory.qty;

    return this.inventoriesRepository.save(inventory);
  }

  async findInventoryInfoByMachineId(machineId, query): Promise<IPagination<Inventory[]>> {
    const { page, limit } = query;
    const [results, total] = await this.inventoriesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        machineId: machineId,
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
}
