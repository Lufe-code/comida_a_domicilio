import React, { useState } from "react";
import "./Main.css";

// Categorías de comida populares
const foodCategories = [
  { name: "Hamburguesas", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Sushi", icon: "🍣" },
  { name: "Pollo", icon: "🍗" },
  { name: "Ensaladas", icon: "🥗" },
  { name: "Postres", icon: "🍰" },
];

// Restaurantes destacados
const featuredRestaurants = [
  {
    id: 1,
    name: "Burger Deluxe",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    deliveryTime: "25-35 min",
    category: "Hamburguesas",
  },
  {
    id: 2,
    name: "Pizza Express",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    deliveryTime: "30-45 min",
    category: "Pizza",
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    deliveryTime: "40-50 min",
    category: "Sushi",
  },
  {
    id: 4,
    name: "Green Garden",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    deliveryTime: "20-30 min",
    category: "Ensaladas",
  },
];

// Ofertas especiales
const specialOffers = [
  {
    id: 1,
    title: "2x1 en Hamburguesas",
    restaurant: "Burger Deluxe",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80",
    validUntil: "Lunes a Viernes",
  },
  {
    id: 2,
    title: "Envío Gratis",
    restaurant: "Pizza Express",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
    validUntil: "En pedidos +$25.000",
  },
  {
    id: 3,
    title: "30% Descuento",
    restaurant: "Sushi Master",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80",
    validUntil: "Primer pedido",
  },
];

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Bogotá, Colombia");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementarías la lógica de búsqueda
    console.log("Buscando:", searchQuery, "en", location);
  };

  return (
    <div className="main-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Comida deliciosa a domicilio</h1>
          <p>Pide tus platos favoritos de los mejores restaurantes de tu zona</p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="location-input">
              <span className="input-icon">📍</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Tu ubicación"
              />
            </div>
            <div className="search-input">
              <span className="input-icon">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar restaurantes o comida..."
              />
            </div>
            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
            alt="Deliciosa comida"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Categorías populares</h2>
        <div className="categories-container">
          {foodCategories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="restaurants-section">
        <div className="section-header">
          <h2>Restaurantes destacados</h2>
          <button className="view-all-button">
            Ver todos →
          </button>
        </div>
        <div className="restaurants-container">
          {featuredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <div className="restaurant-image">
                <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} />
              </div>
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="restaurant-category">{restaurant.category}</p>
                <div className="restaurant-details">
                  <span className="rating">
                    ⭐ {restaurant.rating}
                  </span>
                  <span className="delivery-time">
                    🕒 {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="offers-section">
        <h2>Ofertas especiales</h2>
        <div className="offers-container">
          {specialOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image">
                <img src={offer.image || "/placeholder.svg"} alt={offer.title} />
                <div className="offer-badge">{offer.title}</div>
              </div>
              <div className="offer-info">
                <h3>{offer.restaurant}</h3>
                <p>Válido: {offer.validUntil}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-download-section">
        <div className="app-content">
          <h2>Descarga nuestra aplicación</h2>
          <p>Pide más rápido, sigue tus pedidos en tiempo real y recibe ofertas exclusivas</p>
          <div className="app-buttons">
            <button className="app-button">
              <span className="app-icon">📱</span>
              <span className="app-text">
                <small>Descargar en</small>
                <strong>App Store</strong>
              </span>
            </button>
            <button className="app-button">
              <span className="app-icon">🤖</span>
              <span className="app-text">
                <small>Descargar en</small>
                <strong>Google Play</strong>
              </span>
            </button>
          </div>
        </div>
        <div className="app-image">
          <img
            src="https://images.unsplash.com/photo-1605170439002-90845e8c0137?auto=format&fit=crop&w=500&q=80"
            alt="Aplicación móvil"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <p>© 2024 Domicilios Express. Todos los derechos reservados.</p>
        <p>¡Disfruta de la mejor comida a domicilio!</p>
      </footer>
    </div>
  );
};

export default MainPage;