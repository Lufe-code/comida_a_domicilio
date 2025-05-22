import axios from "axios";
import { PhotoData, PhotoResponse } from "../types/photo.types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/photos";

export const getPhotos = async (): Promise<PhotoResponse[]> => {
  const res = await axios.get<PhotoResponse[]>(`${API_URL}/photos`);
  return res.data;
};

export const getPhoto = async (id: number): Promise<PhotoResponse> => {
  const res = await axios.get<PhotoResponse>(`${API_URL}/photos/${id}`);
  return res.data;
};

export const createPhoto = async (data: PhotoData): Promise<PhotoResponse> => {
  const res = await axios.post<PhotoResponse>(`${API_URL}/photos`, data);
  return res.data;
};

export const updatePhoto = async (id: number, data: PhotoData): Promise<PhotoResponse> => {
  const res = await axios.put<PhotoResponse>(`${API_URL}/photos/${id}`, data);
  return res.data;
};

export const deletePhoto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/photos/${id}`);
};