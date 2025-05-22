export interface MotorcycleData {
  license_plate: string;
  brand: string;
  year: number;
  status: string;
}

export interface MotorcycleResponse extends MotorcycleData {
  id: number;
  created_at: string;
}