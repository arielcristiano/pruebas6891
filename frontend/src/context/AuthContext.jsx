// Importación de dependencias necesarias de React
import React, { createContext, useState, useContext, useEffect } from 'react';

// Creación del contexto de autenticación
const AuthContext = createContext(null);

// Proveedor del contexto de autenticación
// Este componente maneja el estado global de autenticación y provee métodos para login/logout
export const AuthProvider = ({ children }) => {
  // Estados para manejar la autenticación, datos del usuario y estado de carga
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto para recuperar la sesión del usuario al cargar la aplicación
  useEffect(() => {
    try {
      const user = localStorage.getItem('currentUser');
      const token = localStorage.getItem('authToken');
      
      if (user && token) {
        const userData = JSON.parse(user);
        // Verificar que el token no haya expirado (opcional)
        setCurrentUser(userData);
        setIsAuthenticated(true);
        console.log('Usuario restaurado del localStorage:', userData);
      }
    } catch (error) {
      console.error('Error al restaurar la sesión:', error);
      // Limpiar datos corruptos
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    console.log('Login ejecutado con:', userData);
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Guardar el token por separado para facilitar el acceso
    if (userData.token) {
      localStorage.setItem('authToken', userData.token);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    console.log('Logout ejecutado');
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  // Función para obtener el token de autenticación
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return currentUser?.roles === role || currentUser?.role === role;
  };

  // Proveedor que expone el estado y funciones de autenticación a toda la aplicación
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      loading,
      login, 
      logout,
      getAuthToken,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};