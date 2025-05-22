import React, { useEffect, useState } from "react";
import { getOrders } from "../api/order.api";
import { OrderResponse } from "../types/Order.type";
// Instala: npm install chart.js react-chartjs-2
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const StatsDashboard: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  // 1. Most sold products
  const productCount: Record<string, { name: string; count: number }> = {};
  orders.forEach((order) => {
    const productName = order.menu?.product?.name || "Desconocido";
    if (!productCount[productName]) {
      productCount[productName] = { name: productName, count: 0 };
    }
    productCount[productName].count += order.quantity;
  });
  const productData = Object.values(productCount).sort((a, b) => b.count - a.count);

  // 2. Most buyer customer
  const customerCount: Record<string, { name: string; count: number }> = {};
  orders.forEach((order) => {
    const customerName = order.customer?.name || "Desconocido";
    if (!customerCount[customerName]) {
      customerCount[customerName] = { name: customerName, count: 0 };
    }
    customerCount[customerName].count += 1;
  });
  const customerData = Object.values(customerCount).sort((a, b) => b.count - a.count);

  // 3. Most used address
  const addressCount: Record<string, { label: string; count: number }> = {};
  orders.forEach((order) => {
    const addressLabel = order.address
      ? `${order.address.street}, ${order.address.city}`
      : "Desconocida";
    if (!addressCount[addressLabel]) {
      addressCount[addressLabel] = { label: addressLabel, count: 0 };
    }
    addressCount[addressLabel].count += 1;
  });
  const addressData = Object.values(addressCount).sort((a, b) => b.count - a.count);

  return (
    <div className="customer-table-container">
      <h1>Estadísticas de Pedidos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}>
          <div style={{ width: 340 }}>
            <h2 style={{ textAlign: "center" }}>Productos más vendidos</h2>
            <Pie
              data={{
                labels: productData.map((p) => p.name),
                datasets: [
                  {
                    data: productData.map((p) => p.count),
                    backgroundColor: [
                      "#ff6384",
                      "#36a2eb",
                      "#ffce56",
                      "#4bc0c0",
                      "#9966ff",
                      "#ff9f40",
                      "#d35400",
                      "#1976d2",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: true, position: "bottom" },
                  title: { display: false },
                },
              }}
            />
          </div>
          <div style={{ width: 340 }}>
            <h2 style={{ textAlign: "center" }}>Clientes con más compras</h2>
            <Pie
              data={{
                labels: customerData.map((c) => c.name),
                datasets: [
                  {
                    data: customerData.map((c) => c.count),
                    backgroundColor: [
                      "#36a2eb",
                      "#ff6384",
                      "#ffce56",
                      "#4bc0c0",
                      "#9966ff",
                      "#ff9f40",
                      "#d35400",
                      "#1976d2",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: true, position: "bottom" },
                  title: { display: false },
                },
              }}
            />
          </div>
          <div style={{ width: 340 }}>
            <h2 style={{ textAlign: "center" }}>Direcciones más usadas</h2>
            <Pie
              data={{
                labels: addressData.map((a) => a.label),
                datasets: [
                  {
                    data: addressData.map((a) => a.count),
                    backgroundColor: [
                      "#ffce56",
                      "#36a2eb",
                      "#ff6384",
                      "#4bc0c0",
                      "#9966ff",
                      "#ff9f40",
                      "#d35400",
                      "#1976d2",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: true, position: "bottom" },
                  title: { display: false },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;