import { useEffect, useState } from "react";
import { CustomerResponse, CustomerData } from "../../types/customer.type";
import { getCustomers, deleteCustomer, createCustomer, updateCustomer, getCustomer } from "../../api/customer.api";
import Modal from "../common/modalForm";
import CustomerForm from "./CustomerForm";

const CustomerTable = () => {
  const [customers, setCustomers] = useState<CustomerResponse[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setCustomers(await getCustomers());
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // CREATE
  const handleCreate = () => {
    setModalType("create");
    setSelectedCustomer(null);
    setModalOpen(true);
  };

  const handleCreateSubmit = async (data: CustomerData) => {
    setLoading(true);
    try {
      await createCustomer(data);
      setModalOpen(false);
      fetchData();
    } catch {
      alert("Error creating customer");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const handleUpdate = async (customerId: string) => {
    setModalType("update");
    setLoading(true);
    try {
      const customer = await getCustomer(customerId);
      setSelectedCustomer(customer);
      setModalOpen(true);
    } catch {
      alert("Error loading customer");
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (data: CustomerData) => {
    if (!selectedCustomer) return;
    setLoading(true);
    try {
      await updateCustomer(selectedCustomer.id, data);
      setModalOpen(false);
      fetchData();
    } catch {
      alert("Error updating customer");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (customerId: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(customerId);
        setCustomers((prev) => prev ? prev.filter(c => c.id !== customerId) : null);
      } catch (error) {
        alert("Error deleting customer");
      }
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Customer Table</h1>
      <button onClick={handleCreate}>Create Customer</button>
      {customers ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  {new Date(customer.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <button onClick={() => handleUpdate(customer.id)} style={{ marginRight: "5px" }}>Update</button>
                  <button onClick={() => handleDelete(customer.id)} style={{ color: "red" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}

      {/* Modal for Create/Update */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === "create" && (
          <CustomerForm
            title="Create Customer"
            onSubmit={handleCreateSubmit}
            loading={loading}
          />
        )}
        {modalType === "update" && selectedCustomer && (
          <CustomerForm
            title="Update Customer"
            initialData={{
              name: selectedCustomer.name,
              email: selectedCustomer.email,
              phone: selectedCustomer.phone,
            }}
            onSubmit={handleUpdateSubmit}
            loading={loading}
          />
        )}
      </Modal>
    </div>
  );
};

export default CustomerTable;