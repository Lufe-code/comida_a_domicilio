import axios from "axios";
import { ShiftData, ShiftResponse } from "../types/Shift.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/shifts";

export const getShifts = async (): Promise<ShiftResponse[]> => {
  const res = await axios.get<ShiftResponse[]>(`${API_URL}/shifts`);
  return res.data;
};

export const getShift = async (id: number): Promise<ShiftResponse> => {
  const res = await axios.get<ShiftResponse>(`${API_URL}/shifts/${id}`);
  return res.data;
};

export const createShift = async (data: ShiftData): Promise<ShiftResponse> => {
  const res = await axios.post<ShiftResponse>(`${API_URL}/shifts`, data);
  return res.data;
};

export const updateShift = async (id: number, data: ShiftData): Promise<ShiftResponse> => {
  const res = await axios.put<ShiftResponse>(`${API_URL}/shifts/${id}`, data);
  return res.data;
};

export const deleteShift = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/shifts/${id}`);
};