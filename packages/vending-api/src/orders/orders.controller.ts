import { InventoriesService } from '@/inventories/inventories.service';
import { ProductsService } from '@/products/products.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ICreateOrder,
  ICreateOrderItem,
  ICreateTransactionOrderItem,
  IInventoryAdjustmentItem,
} from './types/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly inventoriesService: InventoriesService,
  ) {}

  @Post()
  async create(@Body() createOrder: ICreateOrder) {
    const { items, machineId, paymentMethod } = createOrder;

    const inventories = await this.inventoryValidation(machineId, items);
    const orderItems = await this.orderProductAggregation(items);
    const priceSummary = await this.priceSummaryCalculation(orderItems);

    const createOrderInfo = {
      machineId: machineId,
      paymentMethod: paymentMethod,
      discount: priceSummary.discount,
      subTotals: priceSummary.subTotals,
      grandTotals: priceSummary.grandTotals,
      items: orderItems,
    };

    const createOrderAsync = this.ordersService.create(createOrderInfo);
    const adjustStockAsync = this.inventoryAdjustment(inventories);
    const [createdOrder] = await Promise.all([createOrderAsync, adjustStockAsync]);

    this.inventoriesService.insufficientValidation(inventories);

    return createdOrder;
  }

  private async orderProductAggregation(items: ICreateOrderItem[]): Promise<ICreateTransactionOrderItem[]> {
    const productIds = items.map((item) => item.productId);
    const products = await this.productsService.findByIds(productIds);

    const orderItems = products.map((item) => {
      const buyQty = items.find((createItem) => createItem.productId === item.id).qty;
      const total = item.price * buyQty;

      return {
        productId: item.id,
        name: item.name,
        image: item.image,
        qty: buyQty,
        price: item.price,
        totals: total,
      };
    });

    return orderItems;
  }

  private async inventoryValidation(machineId: number, items: ICreateOrderItem[]): Promise<IInventoryAdjustmentItem[]> {
    const productIds = items.map((item) => item.productId);
    const inventories = await this.inventoriesService.findByProductIds(machineId, productIds);

    const availableInventories = items.map((item) => {
      const buyQty = item.qty;
      const productId = item.productId;
      const inStoreQty = inventories.find((inventory) => inventory.productId === productId).qty;

      if (buyQty > inStoreQty) {
        throw new BadRequestException(`insufficient stock on productId ${productId}. now has only ${inStoreQty} item.`);
      }

      return {
        machineId: machineId,
        productId: productId,
        buyQty: buyQty,
        InStoreQty: inStoreQty,
        toBeQty: inStoreQty - buyQty,
      };
    });

    return availableInventories;
  }

  private priceSummaryCalculation(
    products: ICreateTransactionOrderItem[],
  ): { discount: number; subTotals: number; grandTotals: number } {
    const subTotals = products.reduce((sum, currentValue) => sum + currentValue.price * currentValue.qty, 0);
    const discount = 0;
    const grandTotals = subTotals - discount;

    return { discount, subTotals, grandTotals };
  }

  private async inventoryAdjustment(inventories: IInventoryAdjustmentItem[]) {
    const inventoriesToUpdate = inventories.map((stock) => {
      return {
        machineId: stock.machineId,
        productId: stock.productId,
        qty: stock.toBeQty,
      };
    });

    return this.inventoriesService.batchUpdate(inventoriesToUpdate);
  }
}
