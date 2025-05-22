import React, { useState, useEffect } from "react";
import { MenuData } from "../../types/Menu.type";
import { ProductResponse } from "../../types/Product.type";

interface Props {
  initialData: MenuData;
  onSubmit: (data: MenuData) => void;
  loading?: boolean;
  title: string;
  products: ProductResponse[];
}

const MenuForm: React.FC<Props> = ({ initialData, onSubmit, loading, title, products }) => {
  const [form, setForm] = useState<MenuData>(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    setForm({
      ...form,
      [name]: e.target.checked,
    });
  } else if (name === "price" || name === "product_id" || name === "restaurant_id") {
    setForm({
      ...form,
      [name]: Number(value),
    });
  } else {
    setForm({
      ...form,
      [name]: value,
    });
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>{title}</h2>
      <select
        name="product_id"
        value={form.product_id}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      >
        <option value="">Selecciona un producto</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        name="price"
        placeholder="Precio"
        type="number"
        value={form.price}
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <label>
        <input
          type="checkbox"
          name="availability"
          checked={form.availability}
          onChange={handleChange}
        />
        Disponible
      </label>
      <button type="submit" disabled={loading} style={{ width: "100%", marginTop: 12 }}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default MenuForm;