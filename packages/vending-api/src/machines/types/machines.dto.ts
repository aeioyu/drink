export class ICreateMachine {
  serialNo: string;
  location: string;
  isActive: boolean;
}

export class IUpdateMachine {
  serialNo: string;
  location: string;
  isActive: boolean;
}

export class IAllMachinesQuery {
  page: number;
  limit: number;
}
