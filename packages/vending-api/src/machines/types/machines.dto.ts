export class ICreateMachine {
  name: string;
  serialNo: string;
  location: string;
  latitude: string;
  longitude: string;
}

export class IUpdateMachine {
  serialNo: string;
  location: string;
  isActive: boolean;
}
