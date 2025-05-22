import React, { useState, useEffect } from "react";
import { ProductData } from "../../types/Product.type";

interface Props {
  initialData?: ProductData;
  onSubmit: (data: ProductData) => void;
  loading?: boolean;
  title: string;
}

const ProductForm: React.FC<Props> = ({ initialData, onSubmit, loading, title }) => {
  const [form, setForm] = useState<ProductData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    ...initialData,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>{title}</h2>
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="price"
        placeholder="Precio"
        type="number"
        value={form.price}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default ProductForm;