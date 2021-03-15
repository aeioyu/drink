import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from './machines.entity';
import { ICreateMachine, IUpdateMachine } from './types/machines.dto';
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
    machine.name = createMachine.name;
    machine.latitude = createMachine.latitude;
    machine.longitude = createMachine.longitude;

    return this.machinesRepository.save(machine);
  }

  update(machineId: number, updateMachine: IUpdateMachine): Promise<Machine> {
    const machine = new Machine();
    machine.id = machineId;
    machine.location = updateMachine.location;
    machine.serialNo = updateMachine.serialNo;
    machine.name = updateMachine.name;
    machine.latitude = updateMachine.latitude;
    machine.longitude = updateMachine.longitude;

    return this.machinesRepository.save(machine);
  }

  async findAll(query): Promise<IPagination<Machine[]>> {
    const { page, limit } = query;
    const [results, total] = await this.machinesRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        id: 'DESC',
      },
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
