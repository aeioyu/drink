export class ICreateInventory {
  machineId: number;
  productId: number;
  qty: number;
}

export class IUpdateProduct {
  serialNo: string;
  location: string;
  isActive: boolean;
}

export class IAllProductsQuery {
  page: number;
  limit: number;
}
