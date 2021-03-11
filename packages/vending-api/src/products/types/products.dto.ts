export class ICreateProduct {
  sku: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export class IUpdateProduct {
  serialNo: string;
  location: string;
  isActive: boolean;
}
