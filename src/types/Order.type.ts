import { AddressResponse } from "./Address.type";
import { CustomerResponse } from "./customer.type";
import { MenuResponse } from "./Menu.type";

export interface OrderProduct {
  menu_id: number;
  quantity: number;
}

export interface OrderData {
  customer_id: number;
  address: AddressResponse | null;
  restaurant_id: number;
  products: OrderProduct[];
  status?: string;
}

export interface OrderResponse {
  id: number;
  created_at: string;
  customer: CustomerResponse;
  address: AddressResponse;
  menu: MenuResponse;
  menu_id: number;
  motorcycle_id: number;
  quantity: number;
  status: string;
  total_price: number;
}