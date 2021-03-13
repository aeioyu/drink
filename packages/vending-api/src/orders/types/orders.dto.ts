export class ICreateOrder {
  machineId: number;
  paymentMethod: string;
  items: ICreateOrderItem[];
}

export class ICreateOrderItem {
  productId: number;
  qty: number;
}

export class ICreateTransactionOrder {
  machineId: number;
  subTotals: number;
  discount: number;
  grandTotals: number;
  paymentMethod: string;
  items: ICreateTransactionOrderItem[];
}

export class ICreateTransactionOrderItem {
  productId: number;
  name: string;
  image: string;
  price: number;
  qty: number;
  totals: number;
}

export class IInventoryAdjustmentItem {
  machineId: number;
  productId: number;
  buyQty: number;
  InStoreQty: number;
  toBeQty: number;
}
