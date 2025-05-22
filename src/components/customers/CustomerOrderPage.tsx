import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrders } from "../../api/order.api";
import { OrderResponse } from "../../types/Order.type";

const CustomerOrdersPage = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  useEffect(() => {
  if (customerId) {
    getOrders().then(all =>
      setOrders(all.filter(order => String(order.customer.id) === customerId))
    );
  }
}, [customerId]);

  return (
    <div>
      <h2>Órdenes del Cliente</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes para este cliente.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>${order.total_price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerOrdersPage;