import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrder } from "../api/order.api";
import { OrderResponse } from "../types/Order.type";

interface OrdersByCustomer {
  [customerId: string]: {
    customerName: string;
    customerEmail: string;
    orders: OrderResponse[];
  };
}

const OrdersByCustomerPage: React.FC = () => {
  const [ordersByCustomer, setOrdersByCustomer] = useState<OrdersByCustomer>({});
  const [loading, setLoading] = useState(true);

  // Simple update: only allow updating status for demonstration
  const handleUpdate = async (order: OrderResponse) => {
    const newStatus = prompt(
      `Actualizar estado de la orden ${order.id} (actual: ${order.status}):`,
      order.status
    );
    if (newStatus && newStatus !== order.status) {
      try {
        await updateOrder(order.id, { status: newStatus });
        fetchOrders();
      } catch {
        alert("Error actualizando la orden");
      }
    }
  };

  const fetchOrders = () => {
    setLoading(true);
    getOrders().then((orders) => {
      const grouped: OrdersByCustomer = {};
      orders.forEach((order) => {
        const id = order.customer.id;
        if (!grouped[id]) {
          grouped[id] = {
            customerName: order.customer.name,
            customerEmail: order.customer.email,
            orders: [],
          };
        }
        grouped[id].orders.push(order);
      });
      setOrdersByCustomer(grouped);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (orderId: number) => {
    if (window.confirm("¿Seguro que deseas eliminar esta orden?")) {
      try {
        await deleteOrder(orderId);
        fetchOrders();
      } catch {
        alert("Error eliminando la orden");
      }
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Órdenes agrupadas por cliente</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        Object.keys(ordersByCustomer).length === 0 ? (
          <p>No hay órdenes registradas.</p>
        ) : (
          Object.entries(ordersByCustomer).map(([customerId, group]) => (
            <div key={customerId} style={{ marginBottom: 40 }}>
              <h2 style={{ color: "#d35400" }}>
                {group.customerName} <span style={{ color: "#888", fontSize: 16 }}>({group.customerEmail})</span>
              </h2>
              <table>
                <thead>
                  <tr>
                    <th>ID Orden</th>
                    <th>Fecha</th>
                    <th>Dirección</th>
                    <th>Restaurante</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {group.orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{new Date(order.created_at).toLocaleString()}</td>
                      <td>
                        {order.address
                          ? `${order.address.street}, ${order.address.city}`
                          : "-"}
                      </td>
                      <td>{order.menu?.restaurant?.name || "-"}</td>
                      <td>${order.total_price}</td>
                      <td>{order.status}</td>
                      <td>
                        <button onClick={() => handleUpdate(order)} style={{ marginRight: 6 }}>Actualizar</button>
                        <button onClick={() => handleDelete(order.id)} style={{ color: "red" }}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default OrdersByCustomerPage;