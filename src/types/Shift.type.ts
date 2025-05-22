import { DriverResponse } from "./driver.type";
import { MotorcycleResponse } from "./Motorcycle.type";

export interface ShiftData {
  driver_id: number;
  motorcycle_id: number;
  start_time: string;
  end_time: string;
  status: string;
}

export interface ShiftResponse extends ShiftData {
  id: number;
  created_at: string;
  driver: DriverResponse;
  motorcycle: MotorcycleResponse;
}