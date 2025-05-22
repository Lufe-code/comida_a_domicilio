import React, { useEffect, useState } from "react";
import { AddressResponse, AddressData } from "../../types/Address.type";
import { getAddresses, getAddress, createAddress, updateAddress, deleteAddress } from "../../api/address.api";
import Modal from "../common/modalForm";
import AddressForm from './AddressForm';

const AddressTable = () => {
  const [addresses, setAddresses] = useState<AddressResponse[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setAddresses(await getAddresses());
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setSelectedAddress(null);
    setModalOpen(true);
  };

  const handleCreateSubmit = async (data: AddressData) => {
    setLoading(true);
    try {
      await createAddress(data);
      setModalOpen(false);
      fetchData();
    } catch {
      alert("Error creating address");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setModalType("update");
    setLoading(true);
    try {
      const address = await getAddress(id);
      setSelectedAddress(address);
      setModalOpen(true);
    } catch {
      alert("Error loading address");
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (data: AddressData) => {
    if (!selectedAddress) return;
    setLoading(true);
    try {
      await updateAddress(selectedAddress.id, data);
      setModalOpen(false);
      fetchData();
    } catch {
      alert("Error updating address");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        setAddresses((prev) => prev ? prev.filter(a => a.id !== id) : null);
      } catch {
        alert("Error deleting address");
      }
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Direcciones</h1>
      <button onClick={handleCreate}>Crear Dirección</button>
      {addresses ? (
        <table>
          <thead>
            <tr>
              <th>Calle</th>
              <th>Apto</th>
              <th>Ciudad</th>
              <th>Estado</th>
              <th>Código Postal</th>
              <th>Order ID</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr key={address.id}>
                <td>{address.street}</td>
                <td>{address.apto || "-"}</td>
                <td>{address.city}</td>
                <td>{address.state}</td>
                <td>{address.postal_code}</td>
                <td>{address.order_id || "-"}</td>
                <td>{new Date(address.created_at).toLocaleDateString("es-ES")}</td>
                <td>
                  <button onClick={() => handleUpdate(address.id)}>Editar</button>
                  <button onClick={() => handleDelete(address.id)} style={{ color: "red" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === "create" && (
          <AddressForm
            title="Crear Dirección"
            onSubmit={handleCreateSubmit}
            loading={loading}
          />
        )}
        {modalType === "update" && selectedAddress && (
          <AddressForm
            title="Editar Dirección"
            initialData={{
              street: selectedAddress.street,
              apto: selectedAddress.apto,
              city: selectedAddress.city,
              state: selectedAddress.state,
              postal_code: selectedAddress.postal_code,
              order_id: selectedAddress.order_id,
            }}
            onSubmit={handleUpdateSubmit}
            loading={loading}
          />
        )}
      </Modal>
    </div>
  );
};

export default AddressTable;