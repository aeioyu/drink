import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from './machines.entity';
import { ICreateMachine } from './types/machines.dto';
import { IPagination } from '../global/types/pagination.dto';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
  ) {}

  create(createMachine: ICreateMachine): Promise<Machine> {
    const machine = new Machine();
    machine.location = createMachine.location;
    machine.serialNo = createMachine.serialNo;

    return this.machinesRepository.save(machine);
  }

  async findAll(query): Promise<IPagination<Machine[]>> {
    const { page, limit } = query;
    const [results, total] = await this.machinesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      page: page,
      limit: limit,
      totals: total,
      items: results,
    };
  }

  findOne(id: string): Promise<Machine> {
    return this.machinesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.machinesRepository.delete(id);
  }
}
