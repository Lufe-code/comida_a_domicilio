import React, { useEffect, useState } from "react";
import { RestaurantResponse, RestaurantData } from "../../types/Restaurant.type";
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from "../../api/restaurant.api";
import { Link } from "react-router-dom";

// Simple modal and form for demonstration
const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) =>
  !open ? null : (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 8, right: 12, background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>×</button>
        {children}
      </div>
    </div>
  );

const RestaurantForm: React.FC<{
  initialData?: RestaurantData;
  onSubmit: (data: RestaurantData) => void;
  loading?: boolean;
  title: string;
}> = ({ initialData, onSubmit, loading, title }) => {
  const [form, setForm] = useState<RestaurantData>(initialData || {
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
      <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
    </form>
  );
};

const RestaurantTable = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = () => {
    getRestaurants().then(setRestaurants);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleCreate = () => {
    setModalType("create");
    setSelectedRestaurant(null);
    setModalOpen(true);
  };

  const handleCreateSubmit = async (data: RestaurantData) => {
    setLoading(true);
    await createRestaurant(data);
    setLoading(false);
    setModalOpen(false);
    fetchRestaurants();
  };

  const handleUpdate = (id: number) => {
    const rest = restaurants.find(r => r.id === id) || null;
    setSelectedRestaurant(rest);
    setModalType("update");
    setModalOpen(true);
  };

  const handleUpdateSubmit = async (data: RestaurantData) => {
    if (!selectedRestaurant) return;
    setLoading(true);
    await updateRestaurant(selectedRestaurant.id, data);
    setLoading(false);
    setModalOpen(false);
    fetchRestaurants();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este restaurante?")) {
      await deleteRestaurant(id);
      fetchRestaurants();
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Restaurantes</h1>
      <button onClick={handleCreate} style={{ marginBottom: 12 }}>Crear Restaurante</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Menú</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.address}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>
                <Link to={`/restaurants/${r.id}/menu`} className="main-link">
                  Ver Menú
                </Link>
              </td>
              <td>
                <button onClick={() => handleUpdate(r.id)} style={{ marginRight: 6 }}>Editar</button>
                <button onClick={() => handleDelete(r.id)} style={{ color: "red" }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === "create" && (
          <RestaurantForm
            title="Crear Restaurante"
            onSubmit={handleCreateSubmit}
            loading={loading}
          />
        )}
        {modalType === "update" && selectedRestaurant && (
          <RestaurantForm
            title="Editar Restaurante"
            initialData={selectedRestaurant}
            onSubmit={handleUpdateSubmit}
            loading={loading}
          />
        )}
      </Modal>
    </div>
  );
};

export default RestaurantTable;