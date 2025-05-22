import React, { useEffect, useState } from "react";
import { ProductResponse, ProductData } from "../../types/Product.type";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../../api/product.api";
import Modal from "../common/modalForm";
import ProductForm from "./ProductForm";

const ProductTable = () => {
  const [products, setProducts] = useState<ProductResponse[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setProducts(await getProducts());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleCreateSubmit = async (data: ProductData) => {
    setLoading(true);
    try {
      await createProduct(data);
      setModalOpen(false);
      fetchData();
    } catch {
      alert("Error creando producto");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setModalType("update");
    setLoading(true);
    try {
      const product = await getProduct(id);
      setSelectedProduct(product);
      setModalOpen(true);
    } catch {
      alert("Error cargando producto");
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (data: ProductData) => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      await updateProduct(selectedProduct.id, data);
      setModalOpen(false);
      fetchData();
    } catch {
      alert("Error actualizando producto");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev ? prev.filter(p => p.id !== id) : null);
      } catch {
        alert("Error eliminando producto");
      }
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Productos</h1>
      <button onClick={handleCreate}>Crear Producto</button>
      {products ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{new Date(product.created_at).toLocaleDateString("es-ES")}</td>
                <td>
                  <button onClick={() => handleUpdate(product.id)}>Editar</button>
                  <button onClick={() => handleDelete(product.id)} style={{ color: "red" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalType === "create" && (
          <ProductForm
            title="Crear Producto"
            onSubmit={handleCreateSubmit}
            loading={loading}
          />
        )}
        {modalType === "update" && selectedProduct && (
          <ProductForm
            title="Editar Producto"
            initialData={{
              name: selectedProduct.name,
              description: selectedProduct.description,
              price: selectedProduct.price,
              category: selectedProduct.category,
            }}
            onSubmit={handleUpdateSubmit}
            loading={loading}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProductTable;