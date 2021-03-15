import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import config from '@/configs/appConfig';
import { IPagination } from '@/global/types';

export interface IMachine {
  active: boolean;
  createAt: string;
  id: number;
  latitude: string | null;
  location: string | null;
  longitude: string | null;
  name: string;
  serialNo: string;
  updateAt: string;
}

export interface IMachineInventories {
  machineId: number;
  productId: number;
  qty: number;
  product: IProduct;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sku: string;
  createAt: string;
}

async function getMachines(): Promise<IPagination<IMachine>> {
  const { data } = await axios.get(`${config.apiUrl}/machines?limit=0&page=1`);
  return data;
}

async function getMachineProductsById(machineId): Promise<IPagination<IMachineInventories>> {
  const { data } = await axios.get(`${config.apiUrl}/machines/${machineId}/products?limit=0&page=1`);
  return data;
}

export function useMachines(): UseQueryResult<IPagination<IMachine>> {
  return useQuery('machines', getMachines);
}

export function useMachineProducts(machineId: number): UseQueryResult<IPagination<IMachineInventories>> {
  return useQuery(['machines', machineId], () => getMachineProductsById(machineId), {
    enabled: false,
    // Refetch data every minute to support stock restore when vending machine
    // refetchInterval: 60 * 1000, // 1min
  });
}
