import axios from "axios";
import { ProductData, ProductResponse } from "../types/Product.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getProducts = async (): Promise<ProductResponse[]> => {
  const res = await axios.get<ProductResponse[]>(`${API_URL}/products`);
  return res.data;
};

export const getProduct = async (id: number): Promise<ProductResponse> => {
  const res = await axios.get<ProductResponse>(`${API_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (data: ProductData): Promise<ProductResponse> => {
  const res = await axios.post<ProductResponse>(`${API_URL}/products`, data);
  return res.data;
};

export const updateProduct = async (id: number, data: ProductData): Promise<ProductResponse> => {
  const res = await axios.put<ProductResponse>(`${API_URL}/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};