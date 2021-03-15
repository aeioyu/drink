import { IPagination } from '@/global/types';
import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import config from '@/configs/appConfig';

interface IProduct {
  id: number;
  name: string;
  image: string;
  sku: string;
  price: string;
}

async function getProducts(): Promise<IPagination<IProduct>> {
  const { data } = await axios.get(`${config.apiUrl}/products?limit=0&page=1`);
  return data;
}

export function useProducts(): UseQueryResult<IPagination<IProduct>> {
  return useQuery(['products'], () => getProducts(), {
    retry: false,
  });
}
