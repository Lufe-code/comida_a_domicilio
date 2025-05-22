import React, { useState, useEffect } from "react";
import { CustomerData} from "../../types/customer.type";

interface Props {
  initialData?: CustomerData;
  onSubmit: (data: CustomerData) => void;
  loading?: boolean;
  title: string;
}

const CustomerForm: React.FC<Props> = ({ initialData, onSubmit, loading, title }) => {
  const [form, setForm] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
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
      <div style={{ marginBottom: 12 }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 8 }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CustomerForm;