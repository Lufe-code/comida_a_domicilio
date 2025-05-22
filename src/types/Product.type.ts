export interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface ProductResponse extends ProductData {
  id: number;
  created_at: string;
}