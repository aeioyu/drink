import { useQuery, UseQueryResult, UseMutationResult, useMutation } from 'react-query';
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

interface IMachineInput {
  name: string;
  serialNo: string;
  location: string;
  latitude: string;
  longitude: string;
}

interface IInventory {
  productId: number;
  machineId: number;
  qty: number;
}

async function getMachines(searchTerm: { page: number; limit: number }): Promise<IPagination<IMachine>> {
  const { data } = await axios.get(`${config.apiUrl}/machines?limit=${searchTerm.limit}&page=${searchTerm.page}`);
  return data;
}

async function getMachine(machineId: number): Promise<IMachine> {
  const { data } = await axios.get(`${config.apiUrl}/machines/${machineId}`);
  return data;
}

async function getMachineProductsById(machineId: number): Promise<IPagination<IMachineInventories>> {
  const { data } = await axios.get(`${config.apiUrl}/machines/${machineId}/products?limit=0&page=1`);
  return data;
}

async function removeMachine(machineId: number): Promise<void> {
  const { data } = await axios.delete(`${config.apiUrl}/machines/${machineId}`);
  return data;
}

async function createMachine(createMachineBody: IMachineInput): Promise<void> {
  const { data } = await axios.post(`${config.apiUrl}/machines`, { ...createMachineBody });
  return data;
}

async function updateMachine(machineId: number, updateMachineBody: IMachineInput): Promise<void> {
  const { data } = await axios.put(`${config.apiUrl}/machines/${machineId}`, { ...updateMachineBody });
  return data;
}

async function importMachineProduct(machineId: number, importProducts: IInventory[]): Promise<void> {
  const { data } = await axios.post(`${config.apiUrl}/machines/${machineId}/products`, importProducts);
  return data;
}

async function removeMachineProduct(machineId: number, productId: number): Promise<void> {
  const { data } = await axios.delete(`${config.apiUrl}/machines/${machineId}/products/${productId}`);
  return data;
}

export function useMachines(searchTerm: { page: number; limit: number }): UseQueryResult<IPagination<IMachine>> {
  return useQuery(['machines', searchTerm], () => getMachines(searchTerm), { retry: false, keepPreviousData: true });
}

export function useMachine(machineId: number): UseQueryResult<IMachine> {
  return useQuery(['machines', machineId], () => getMachine(machineId), { enabled: !!machineId, retry: false });
}

export function useMachineProducts(machineId: number): UseQueryResult<IPagination<IMachineInventories>> {
  return useQuery(['machines', 'products', machineId], () => getMachineProductsById(machineId), {
    enabled: !!machineId,
    retry: false,
  });
}

export function useRemoveMachineMutation(): UseMutationResult {
  const mutation = useMutation((machineId: number) => removeMachine(machineId));
  return mutation;
}

export function useCreateMachineMutation(): UseMutationResult {
  const mutation = useMutation((createMachineBody: IMachineInput) => createMachine(createMachineBody));
  return mutation;
}

export function useUpdateMachineMutation(machineId: number): UseMutationResult {
  const mutation = useMutation((updateMachineBody: IMachineInput) => updateMachine(machineId, updateMachineBody));
  return mutation;
}

export function useImportMachineProductMutation(machineId: number): UseMutationResult {
  const mutation = useMutation((inventories: IInventory[]) => importMachineProduct(machineId, inventories));
  return mutation;
}

export function useRemoveMachineProductMutation(machineId: number): UseMutationResult {
  const mutation = useMutation((productId: number) => removeMachineProduct(machineId, productId));
  return mutation;
}
