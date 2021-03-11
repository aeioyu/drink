import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { IPaginationQuery } from 'src/global/types/pagination.dto';
import { InventoriesService } from './inventories.service';
import { ICreateInventory } from './types/inventories.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  create(@Body() createInventory: ICreateInventory) {
    return this.inventoriesService.create(createInventory);
  }

  @Get(':machineId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findByMachineId(@Param('machineId') machineId: number, @Query('query') query: IPaginationQuery) {
    return this.inventoriesService.findInventoryInfoByMachineId(machineId, {
      limit: query.hasOwnProperty('limit') ? +query.limit : 10,
      page: query.hasOwnProperty('page') ? +query.page : 1,
    });
  }
}
