import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('machines')
export class MachinesController {
  @Get()
  async getMachines(@Query('page') page: string, @Query('size') size: string) {
    return `return machines by query page = ${page} size = ${size}`;
  }

  @Get(':id')
  async getMachineByID(@Param('id') id: string) {
    return `Get machine by id = ${id}`;
  }

  @Put(':id')
  async updateMachineByID(@Param('id') id: string) {
    return `update machine id = ${id}`;
  }

  @Post()
  async createMachine(@Body('machine') machine: string) {
    return `created machine ${machine}`;
  }
}
