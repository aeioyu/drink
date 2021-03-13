import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './orders.entity';
import { ICreateTransactionOrder } from './types/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  create(createOrder: ICreateTransactionOrder): Promise<Order> {
    const order = new Order();
    order.machineId = createOrder.machineId;
    order.subTotals = createOrder.subTotals;
    order.discount = createOrder.discount;
    order.grandTotals = createOrder.grandTotals;
    order.paymentMethod = createOrder.paymentMethod;

    order.items = createOrder.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.productId = item.productId;
      orderItem.image = item.image;
      orderItem.name = item.name;
      orderItem.qty = item.qty;
      orderItem.price = item.price;
      orderItem.totals = item.totals;

      return orderItem;
    });

    return this.ordersRepository.save(order);
  }
}
