import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [user, setUser] = React.useState<{ name: string; picture: string } | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const userStr = localStorage.getItem('google_user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      setUser(null);
    }

    // Listen for storage changes (in case of login/logout in another tab)
    const onStorage = () => {
      const userStr = localStorage.getItem('google_user');
      if (userStr) {
        setUser(JSON.parse(userStr));
      } else {
        setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    localStorage.removeItem('google_user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">Panel Principal</Link>
      </div>
      <div className="navbar-links">
        <Link to="/customers" className="navbar-link">Clientes</Link>
        <Link to="/adresses" className="navbar-link">Direcciones</Link>
        <Link to="/products" className="navbar-link">Productos</Link>
        <Link to="/restaurants" className="navbar-link">Restaurantes</Link>
        <Link to="/orders/new" className="navbar-link">Crear Pedido</Link>
        <Link to="/orders/by-customer" className="navbar-link">Órdenes por Cliente</Link>
        <Link to="/stats" className="navbar-link">Estadísticas</Link>
        {!user && (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
        {user && (
          <div className="header-user-info">
            <img src={user.picture} alt="user" />
            <span>{user.name}</span>
            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;