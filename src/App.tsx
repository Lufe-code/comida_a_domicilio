// src/App.tsx
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

// Componentes comunes que se cargan inmediatamente
import Header from './components/common/Header';
import Chatbot from './components/bot/Chatbot';
import LoadingSpinner from './components/common/LoadingSpinner'; // Deberás crear este componente

// Carga perezosa (lazy loading) para mejorar el rendimiento
const MainPage = lazy(() => import('./pages/Main'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CustomerTable = lazy(() => import('./components/customers/CustomerTable'));
const AddressTable = lazy(() => import('./components/Address/AddressTable'));
const ProductTable = lazy(() => import('./components/Product/ProductTable'));
const RestaurantTable = lazy(() => import('./components/Restaurant/RestaurantTable'));
const MenuTable = lazy(() => import('./components/Menu/MenuTable'));
const OrderPage = lazy(() => import('./components/order/OrderPage'));
const OrdersByCustomerPage = lazy(() => import('./pages/OrdersByCustomer'));
const StatsDashboard = lazy(() => import('./pages/Graphics'));
const PedidoNotifier = lazy(() => import('./components/PedidoNotifier'));

// ID de cliente de Google OAuth
const GOOGLE_CLIENT_ID = "186352635832-f80sq0qqvi2rctaabiajaap4u6p0qv8k.apps.googleusercontent.com";

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('google_token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    // Verificar autenticación al cargar la aplicación
    const token = localStorage.getItem('google_token');
    if (token) {
      console.log('Usuario autenticado');
    }
    
    // Configurar tema según preferencias del usuario
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
      document.body.classList.add('dark-theme');
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Header />
        <div className="app-container">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Rutas protegidas */}
              <Route path="/" element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute>
                  <CustomerTable />
                </ProtectedRoute>
              } />
              <Route path="/adresses" element={
                <ProtectedRoute>
                  <AddressTable />
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute>
                  <ProductTable />
                </ProtectedRoute>
              } />
              <Route path="/restaurants" element={
                <ProtectedRoute>
                  <RestaurantTable />
                </ProtectedRoute>
              } />
              <Route path="/restaurants/:restaurantId/menu" element={
                <ProtectedRoute>
                  <MenuTable />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              } />
              <Route path="/orders/new" element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              } />
              <Route path="/orders/by-customer" element={
                <ProtectedRoute>
                  <OrdersByCustomerPage />
                </ProtectedRoute>
              } />
              <Route path="/stats" element={
                <ProtectedRoute>
                  <StatsDashboard />
                </ProtectedRoute>
              } />
              <Route path="/pedido-notifier" element={
                <ProtectedRoute>
                  <PedidoNotifier pedidos={[]} />
                </ProtectedRoute>
              } />
              
              {/* Ruta para manejar URLs no encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
        <Chatbot />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;