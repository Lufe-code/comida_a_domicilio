import axios from "axios";
import { IssueData, IssueResponse } from "../types/Issue.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getIssues = async (): Promise<IssueResponse[]> => {
  const res = await axios.get<IssueResponse[]>(`${API_URL}/issues`);
  return res.data;
};

export const getIssuesByMotorcycle = async (motorcycleId: number): Promise<IssueResponse[]> => {
  const res = await axios.get<IssueResponse[]>(`${API_URL}/motorcycles/${motorcycleId}/issues`);
  return res.data;
};

export const getIssue = async (id: number): Promise<IssueResponse> => {
  const res = await axios.get<IssueResponse>(`${API_URL}/issues/${id}`);
  return res.data;
};

export const createIssue = async (data: IssueData): Promise<IssueResponse> => {
  const res = await axios.post<IssueResponse>(`${API_URL}/issues`, data);
  return res.data;
};

export const updateIssue = async (id: number, data: IssueData): Promise<IssueResponse> => {
  const res = await axios.put<IssueResponse>(`${API_URL}/issues/${id}`, data);
  return res.data;
};

export const deleteIssue = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/issues/${id}`);
};