export interface DriverData {
  name: string;
  email: string;
  phone: string;
  license_number: string;
  status: string; // e.g. "active", "inactive", "in_shift"
}

export interface DriverResponse extends DriverData {
  id: number;
  created_at: string;
}