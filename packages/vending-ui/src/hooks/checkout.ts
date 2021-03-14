import { useMutation, UseMutationResult } from 'react-query';
import axios from 'axios';
import config from '@/configs/appConfig';

interface ICreateOrder {
  machineId: number;
  paymentMethod: string;
  items: ICreateOrderItem[];
}

interface ICreateOrderItem {
  productId: number;
  qty: number;
}

async function createOrder(createOrderInput: ICreateOrder): Promise<any> {
  const { data } = await axios.post(`${config.apiUrl}/orders`, createOrderInput);
  return data;
}

export function useCheckout(): UseMutationResult {
  const mutation = useMutation((createOrderInput: ICreateOrder) => createOrder(createOrderInput));
  return mutation;
}
