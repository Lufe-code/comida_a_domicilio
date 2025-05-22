import { ProductResponse } from "./Product.type";
import { RestaurantResponse } from "./Restaurant.type";

export interface MenuData {
  product_id: number;
  restaurant_id: number;
  price: number;
  availability: boolean;
}

export interface MenuResponse extends MenuData {
  id: number;
  created_at: string;
  product: ProductResponse;
  restaurant: RestaurantResponse;
}

export {};