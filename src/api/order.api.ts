import axios from "axios";
import { OrderData, OrderResponse } from "../types/Order.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const createOrder = async (data: OrderData): Promise<OrderResponse> => {
  // Tomar el primer producto del array
  const firstProduct = data.products[0];
  const payload = {
    customer_id: data.customer_id,
    menu_id: firstProduct.menu_id,
    quantity: firstProduct.quantity,
    motorcycle_id: 1, // O el valor que corresponda
    status: "pending"
  };
  const res = await axios.post<OrderResponse>(`${API_URL}/orders`, payload);
  return res.data;
};

export const getOrders = async (): Promise<OrderResponse[]> => {
  const res = await axios.get<OrderResponse[]>(`${API_URL}/orders`);
  return res.data;
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  await axios.delete(`${API_URL}/orders/${orderId}`);
};

export const updateOrder = async (orderId: number, data: Partial<OrderData>): Promise<OrderResponse> => {
  const res = await axios.put<OrderResponse>(`${API_URL}/orders/${orderId}`, data);
  return res.data;
};