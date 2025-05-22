import React, { useState, useEffect } from "react";
import { AddressData } from "../../types/Address.type";

interface Props {
  initialData?: AddressData;
  onSubmit: (data: AddressData) => void;
  loading?: boolean;
  title: string;
}

const AddressForm: React.FC<Props> = ({ initialData, onSubmit, loading, title }) => {
  const [form, setForm] = useState<AddressData>({
    street: "",
    apto: "",
    city: "",
    state: "",
    postal_code: "",
    order_id: undefined,
    ...initialData,
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
      <h2 style={{ marginBottom: 16 }}>{title}</h2>
      <input
        name="street"
        placeholder="Street"
        value={form.street}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="apto"
        placeholder="Apto (opcional)"
        value={form.apto || ""}
        onChange={handleChange}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="postal_code"
        placeholder="Postal Code"
        value={form.postal_code}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="order_id"
        placeholder="Order ID (opcional)"
        value={form.order_id || ""}
        onChange={handleChange}
        type="number"
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default AddressForm;