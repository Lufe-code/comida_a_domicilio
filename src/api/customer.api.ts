import axios from "axios";
import { CustomerData, CustomerResponse } from "../types/customer.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/customers";

const token = localStorage.getItem("google_token");
fetch("/api/endpoint", {
  headers: {
    Authorization: `Bearer ${token}`,
    // ...other headers
  },
  // ...other fetch options
});

export const getCustomers = async(): Promise<CustomerResponse[]> => {
  try {
    const response = await axios.get<CustomerResponse[]>(`${API_URL}/customers`);
    console.log("Response data:", response.data); 
    return response.data;
    
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getCustomer = async(customerId: string): Promise<CustomerResponse> => {
  try {
    const response = await axios.get<CustomerResponse>(`${API_URL}/customers/${customerId}`);
    console.log("Response data:", response.data); 
    return response.data;
    
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const createCustomer = async (customerData: CustomerData): Promise<CustomerResponse> => {
  try {
    const response = await axios.post<CustomerResponse>(`${API_URL}/customers`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;  
  }
}

export const updateCustomer = async (customerId: string, customerData: CustomerData): Promise<CustomerResponse> => {
  try {
    const response = await axios.put<CustomerResponse>(`${API_URL}/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
}

export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/customers/${customerId}`);
    console.log(`Customer with ID ${customerId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
}


