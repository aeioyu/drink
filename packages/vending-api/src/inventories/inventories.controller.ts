import { IPaginationQuery } from '@/global/types/pagination.dto';
import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { IInventory } from './types/inventories.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  adjust(@Body() createInventory: IInventory) {
    return this.inventoriesService.upsert(createInventory);
  }

  @Get(':machineId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Param('machineId') machineId: number, @Query('query') query: IPaginationQuery) {
    return this.inventoriesService.findAllByMachineId(machineId, {
      limit: query.hasOwnProperty('limit') ? +query.limit : 10,
      page: query.hasOwnProperty('page') ? +query.page : 1,
    });
  }
}
