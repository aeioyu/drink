import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ICreateMachine, IUpdateMachine } from './types/machines.dto';
import { MachinesService } from './machines.service';
import { IPaginationQuery } from 'src/global/types/pagination.dto';
import { InventoriesService } from '@/inventories/inventories.service';
import { IInventory } from '@/inventories/types/inventories.dto';

@Controller('machines')
export class MachinesController {
  constructor(
    private readonly machinesService: MachinesService,
    private readonly inventoriesService: InventoriesService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  fineAll(@Query() query: IPaginationQuery) {
    return this.machinesService.findAll({
      limit: query.hasOwnProperty('limit') ? +query.limit : 10,
      page: query.hasOwnProperty('page') ? +query.page : 1,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const machine = await this.machinesService.findOne(id);

    if (!machine) {
      throw new NotFoundException();
    }

    return machine;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMachine: IUpdateMachine) {
    return this.machinesService.update(+id, updateMachine);
  }

  @Post()
  create(@Body() createMachine: ICreateMachine) {
    return this.machinesService.create(createMachine);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.machinesService.remove(id);
  }

  @Get(':id/products')
  @UsePipes(new ValidationPipe({ transform: true }))
  findMachineProducts(@Param('id') id: string, @Query() query: IPaginationQuery) {
    return this.inventoriesService.findAllByMachineId(id, {
      limit: query.hasOwnProperty('limit') ? +query.limit : 10,
      page: query.hasOwnProperty('page') ? +query.page : 1,
    });
  }

  @Post(':id/products')
  adjustMachineProduct(@Body() createInventories: IInventory[]) {
    return this.inventoriesService.upsertMulti(createInventories);
  }

  @Delete(':id/products/:productId')
  removeMachineProduct(@Param('id') id: number, @Param('productId') productId: number) {
    return this.inventoriesService.remove(id, productId);
  }
}
