import axios from "axios";
import { MotorcycleData, MotorcycleResponse } from "../types/Motorcycle.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getMotorcycles = async (): Promise<MotorcycleResponse[]> => {
  const res = await axios.get<MotorcycleResponse[]>(`${API_URL}/motorcycles`);
  return res.data;
};

export const getMotorcycle = async (id: number): Promise<MotorcycleResponse> => {
  const res = await axios.get<MotorcycleResponse>(`${API_URL}/motorcycles/${id}`);
  return res.data;
};

export const createMotorcycle = async (data: MotorcycleData): Promise<MotorcycleResponse> => {
  const res = await axios.post<MotorcycleResponse>(`${API_URL}/motorcycles`, data);
  return res.data;
};

export const updateMotorcycle = async (id: number, data: MotorcycleData): Promise<MotorcycleResponse> => {
  const res = await axios.put<MotorcycleResponse>(`${API_URL}/motorcycles/${id}`, data);
  return res.data;
};

export const deleteMotorcycle = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/motorcycles/${id}`);
};