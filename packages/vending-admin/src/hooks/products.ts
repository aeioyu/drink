import { IPagination } from '@/global/types';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import config from '@/configs/appConfig';

interface IProduct {
  id: number;
  name: string;
  image: string;
  sku: string;
  price: number;
  description: string;
}

interface ICreateProduct {
  sku: string;
  name: string;
  description?: string;
  image: string;
  price: number;
}

async function getProducts(searchTerm): Promise<IPagination<IProduct>> {
  const { data } = await axios.get(`${config.apiUrl}/products?limit=${searchTerm.limit}&page=${searchTerm.page}`);
  return data;
}

async function getProduct(productId: number): Promise<IProduct> {
  const { data } = await axios.get(`${config.apiUrl}/products/${productId}`);
  return data;
}

async function createProduct(createProductBody: ICreateProduct): Promise<void> {
  const { data } = await axios.post(`${config.apiUrl}/products`, { ...createProductBody });
  return data;
}

async function updateProduct(productId: number, updateProductBody: ICreateProduct): Promise<void> {
  const { data } = await axios.put(`${config.apiUrl}/products/${productId}`, { ...updateProductBody });
  return data;
}

async function removeProduct(productId: number): Promise<void> {
  const { data } = await axios.delete(`${config.apiUrl}/products/${productId}`);
  return data;
}

export function useProducts(searchTerm: { page: number; limit: number }): UseQueryResult<IPagination<IProduct>> {
  return useQuery(['products', searchTerm], () => getProducts(searchTerm), {
    retry: false,
  });
}

export function useProduct(productId: number): UseQueryResult<IProduct> {
  return useQuery(['products', productId], () => getProduct(productId), { enabled: !!productId, retry: false });
}

export function useCreateProductMutation(): UseMutationResult {
  const mutation = useMutation((createProductBody: ICreateProduct) => createProduct(createProductBody));
  return mutation;
}

export function useUpdateProductMutation(productId: number): UseMutationResult {
  const mutation = useMutation((updateProductBody: ICreateProduct) => updateProduct(productId, updateProductBody));
  return mutation;
}

export function useRemoveProductMutation(): UseMutationResult {
  const mutation = useMutation((productId: number) => removeProduct(productId));
  return mutation;
}
