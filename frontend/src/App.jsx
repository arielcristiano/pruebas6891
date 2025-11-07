// Importación de dependencias y componentes necesarios
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Importación de componentes de páginas
import Homescreen from "./pages/Homescreen";
import MyProfile from "./pages/MyProfile";
import Products from "./pages/Products";
import Gstprod2 from "./pages/Gstprod2";
import PubliNueva from "./pages/PubliNueva";
import UsersLogin from "./pages/usersLogin";
import Register from "./pages/Register";
import ListaCatalogo from "./pages/ListaCatalogo";
import ResponsiveFooter from "./pages/ResponsiveFooter"; 
import ResponsiveAppBar from "./pages/ResponsiveAppBar";
import ProtectedRoute from './app/routes/ProtectedRoute';

// Componente principal de la aplicación
function App() {
  return (
    // Proveedor de autenticación que envuelve toda la aplicación
    <AuthProvider>
      {/* Configuración del enrutador */}
      <BrowserRouter>
        <div className="appContainer">
          {/* Barra de navegación responsive */}
          <ResponsiveAppBar />
          
          {/* Definición de rutas */}
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Homescreen />} />
            
            {/* Rutas protegidas que requieren autenticación */}
            <Route path="/perfil" element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            } />
            
            {/* Rutas públicas */}
            <Route path="/partidas" element={<ListaCatalogo />} />
            <Route path="/partidas/:id" element={<Products />} />
            <Route path="/login" element={<UsersLogin />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas protegidas para gestión de productos */}
            <Route path="/gestion-productos" element={
              <ProtectedRoute>
                <Gstprod2 />
              </ProtectedRoute>
            } />
            <Route path="/crear-partida" element={
              <ProtectedRoute>
                <PubliNueva />
              </ProtectedRoute>
            } />
          </Routes>
          
          {/* Footer responsive */}
          <ResponsiveFooter />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
