import axios from "axios";
import { MenuData, MenuResponse } from "../types/Menu.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const token = localStorage.getItem("google_token");
fetch("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
    // ...other headers
  },
  // ...other fetch options
});

export const getMenusByRestaurant = async (restaurantId: number): Promise<MenuResponse[]> => {
  const res = await axios.get<MenuResponse[]>(`${API_URL}/restaurants/${restaurantId}/menus`);
  return res.data;
};

export const getMenu = async (id: number): Promise<MenuResponse> => {
  const res = await axios.get<MenuResponse>(`${API_URL}/menus/${id}`);
  return res.data;
};

export const createMenu = async (data: MenuData): Promise<MenuResponse> => {
  const res = await axios.post<MenuResponse>(`${API_URL}/menus`, data);
  return res.data;
};

export const updateMenu = async (id: number, data: MenuData): Promise<MenuResponse> => {
  const res = await axios.put<MenuResponse>(`${API_URL}/menus/${id}`, data);
  return res.data;
};

export const deleteMenu = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/menus/${id}`);
};