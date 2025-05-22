export interface AddressData {
  street: string;
  apto?: string;
  city: string;
  state: string;
  postal_code: string;
  order_id?: number;
}

export interface AddressResponse extends AddressData {
  id: number;
  created_at: string;
}