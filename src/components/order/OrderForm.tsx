// ...existing imports...
import React, { useEffect, useState } from "react";
import { CustomerResponse } from "../../types/customer.type";
import { AddressData, AddressResponse } from "../../types/Address.type";
import { RestaurantResponse } from "../../types/Restaurant.type";
import { MenuResponse } from "../../types/Menu.type";
import { OrderProduct, OrderData } from "../../types/Order.type";
import { getCustomers } from "../../api/customer.api";
import { getAddresses, createAddress } from "../../api/address.api";
import { getRestaurants } from "../../api/restaurant.api";
import { getMenusByRestaurant } from "../../api/menu.api";

interface Props {
  onSubmit: (data: OrderData) => void;
  loading?: boolean;
}

const OrderForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [newAddress, setNewAddress] = useState<AddressData>({
    street: "",
    city: "",
    state: "",
    postal_code: "",
    apto: "",
    order_id: undefined,
  });
  const [useNewAddress, setUseNewAddress] = useState(false);

  // Load customers and restaurants on mount
  useEffect(() => {
    getCustomers().then(setCustomers);
    getRestaurants().then(setRestaurants);
  }, []);

  // Load addresses when customer changes
  useEffect(() => {
    if (selectedCustomer) {
      getAddresses().then(addrs => {
        const filtered = addrs.filter(a => a.order_id === selectedCustomer);
        setAddresses(filtered);
        setSelectedAddress(filtered[0] || null);
        setUseNewAddress(filtered.length === 0); // If no addresses, default to new
      });
    } else {
      setAddresses([]);
      setSelectedAddress(null);
      setUseNewAddress(false);
    }
  }, [selectedCustomer]);

  // Load menus when restaurant changes
  useEffect(() => {
    if (selectedRestaurant) {
      getMenusByRestaurant(selectedRestaurant).then(setMenus);
      setProducts([]);
    }
  }, [selectedRestaurant]);

  // Handle product quantity change
  const handleProductChange = (menu_id: number, quantity: number) => {
    setProducts(prev => {
      const exists = prev.find(p => p.menu_id === menu_id);
      if (exists) {
        return prev.map(p => p.menu_id === menu_id ? { ...p, quantity } : p);
      } else {
        return [...prev, { menu_id, quantity }];
      }
    });
  };

  // Calculate total
  const total = products.reduce((sum, p) => {
    const menu = menus.find(m => m.id === p.menu_id);
    return sum + (menu ? menu.price * p.quantity : 0);
  }, 0);

  // Handle address creation if needed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let addressToUse = selectedAddress;
    if (useNewAddress && selectedCustomer) {
      addressToUse = await createAddress({ ...newAddress, order_id: selectedCustomer });
    }
    if (!selectedCustomer || !selectedRestaurant || products.length === 0) return;
    onSubmit({
      customer_id: selectedCustomer,
      address: addressToUse,
      restaurant_id: selectedRestaurant,
      products: products.filter(p => p.quantity > 0),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Orden</h2>
      <label>Cliente:</label>
      <select
        value={selectedCustomer ?? ""}
        onChange={e => setSelectedCustomer(Number(e.target.value))}
        required
      >
        <option value="">Selecciona un cliente</option>
        {customers.map(c => (
          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
        ))}
      </select>

      {selectedCustomer && (
        <>
          <label>Dirección:</label>
          {addresses.length > 0 && !useNewAddress ? (
            <>
              <select
                value={selectedAddress?.id ?? ""}
                onChange={e => setSelectedAddress(addresses.find(a => a.id === Number(e.target.value)) || null)}
                required
              >
                <option value="">Selecciona una dirección</option>
                {addresses.map(a => (
                  <option key={a.id} value={a.id}>{a.street}, {a.city}</option>
                ))}
              </select>
              <button
                type="button"
                style={{ margin: "8px 0" }}
                onClick={() => setUseNewAddress(true)}
              >
                Usar nueva dirección
              </button>
            </>
          ) : (
            <>
              <input
                name="street"
                placeholder="Calle"
                value={newAddress.street}
                onChange={e => setNewAddress({ ...newAddress, street: e.target.value })}
                required
              />
              <input
                name="city"
                placeholder="Ciudad"
                value={newAddress.city}
                onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                required
              />
              <input
                name="state"
                placeholder="Estado"
                value={newAddress.state}
                onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
                required
              />
              <input
                name="postal_code"
                placeholder="Código Postal"
                value={newAddress.postal_code}
                onChange={e => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                required
              />
              <input
                name="apto"
                placeholder="Apto (opcional)"
                value={newAddress.apto}
                onChange={e => setNewAddress({ ...newAddress, apto: e.target.value })}
              />
              {addresses.length > 0 && (
                <button
                  type="button"
                  style={{ margin: "8px 0" }}
                  onClick={() => setUseNewAddress(false)}
                >
                  Usar dirección existente
                </button>
              )}
            </>
          )}
        </>
      )}

      <label>Restaurante:</label>
      <select
        value={selectedRestaurant ?? ""}
        onChange={e => setSelectedRestaurant(Number(e.target.value))}
        required
      >
        <option value="">Selecciona un restaurante</option>
        {restaurants.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      {menus.length > 0 && (
        <>
          <label>Productos:</label>
          {menus.filter(m => m.availability).map(menu => (
            <div key={menu.id} style={{ marginBottom: 8 }}>
              <span>{menu.product.name} (${menu.price})</span>
              <input
                type="number"
                min={0}
                value={products.find(p => p.menu_id === menu.id)?.quantity || 0}
                onChange={e => handleProductChange(menu.id, Number(e.target.value))}
                style={{ width: 60, marginLeft: 8 }}
              />
            </div>
          ))}
        </>
      )}

      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        Total: ${total}
      </div>

      <button type="submit" disabled={loading || !selectedCustomer || !selectedRestaurant || products.length === 0}>
        {loading ? "Guardando..." : "Crear Orden"}
      </button>
    </form>
  );
};

export default OrderForm;
// ...existing code...