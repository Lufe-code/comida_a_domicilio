import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuResponse, MenuData } from "../../types/Menu.type";
import { getMenusByRestaurant, createMenu, updateMenu, deleteMenu, getMenu } from "../../api/menu.api";
import { getProducts } from "../../api/product.api";
import Modal from "../common/modalForm";
import MenuForm from "./MenuForm";
import { ProductResponse } from "../../types/Product.type";

const MenuTable = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      getMenusByRestaurant(Number(restaurantId)).then(setMenus);
      getProducts().then(setProducts);
    }
  }, [restaurantId]);

  const fetchMenus = async () => {
    if (restaurantId) {
      setMenus(await getMenusByRestaurant(Number(restaurantId)));
    }
  };

  const handleCreate = () => {
    setModalType("create");
    setSelectedMenu(null);
    setModalOpen(true);
  };

  const handleCreateSubmit = async (data: MenuData) => {
    setLoading(true);
    try {
      await createMenu({ ...data, restaurant_id: Number(restaurantId) });
      setModalOpen(false);
      fetchMenus();
    } catch {
      alert("Error creando menú");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    setModalType("update");
    setLoading(true);
    try {
      const menu = await getMenu(id);
      setSelectedMenu(menu);
      setModalOpen(true);
    } catch {
      alert("Error cargando menú");
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (data: MenuData) => {
    if (!selectedMenu) return;
    setLoading(true);
    try {
      await updateMenu(selectedMenu.id, data);
      setModalOpen(false);
      fetchMenus();
    } catch {
      alert("Error actualizando menú");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este menú?")) {
      try {
        await deleteMenu(id);
        fetchMenus();
      } catch {
        alert("Error eliminando menú");
      }
    }
  };

  return (
    <div className="customer-table-container">
      <h1>Menú del Restaurante</h1>
      <button onClick={handleCreate}>Agregar al Menú</button>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.map(menu => (
            <tr key={menu.id}>
              <td>{menu.product.name}</td>
              <td>${menu.price}</td>
              <td>{menu.availability ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => handleUpdate(menu.id)}>Editar</button>
                <button onClick={() => handleDelete(menu.id)} style={{ color: "red" }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <MenuForm
          title={modalType === "create" ? "Agregar al Menú" : "Editar Menú"}
          products={products}
          initialData={
            modalType === "update" && selectedMenu
              ? {
                  product_id: selectedMenu.product_id,
                  price: selectedMenu.price,
                  availability: selectedMenu.availability,
                  restaurant_id: Number(restaurantId),
                }
              : { product_id: 0, price: 0, availability: true, restaurant_id: Number(restaurantId) }
          }
          onSubmit={modalType === "create" ? handleCreateSubmit : handleUpdateSubmit}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default MenuTable;