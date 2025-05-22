export interface RestaurantData {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface RestaurantResponse extends RestaurantData {
  id: number;
  created_at: string;
}
// Al final de src/types/Menu.type.ts y src/types/Restaurant.type.ts
export {};