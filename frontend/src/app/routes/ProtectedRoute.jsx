// Importación de dependencias necesarias
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Componente de ruta protegida
// Este componente envuelve rutas que requieren autenticación
// Si el usuario no está autenticado, lo redirige al login
const ProtectedRoute = ({ children }) => {
  // Obtiene el estado de autenticación del contexto
  const { isAuthenticated, loading, currentUser } = useAuth();
  
  // Si está cargando, no hacemos nada aún
  
  if (loading) {
  return <div>Cargando sesión...</div>; // o un spinner

  }
  
  // Verificación de debugging
  console.log('ProtectedRoute - Estado actual:', { 
    isAuthenticated, 
    hasCurrentUser: !!currentUser,
    currentUser 
  });
  
  // Solo redirigimos si definitivamente NO está autenticado
  if (!isAuthenticated) {
    console.log('Redirigiendo a login - Usuario no autenticado');
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return children;
};

export default ProtectedRoute;