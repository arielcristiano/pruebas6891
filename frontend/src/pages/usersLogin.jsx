// Importación de dependencias necesarias
import React, { useState } from "react";
import "./users.css";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

// Componente principal de login de usuarios
function UsersLogin() {
  // Hook de navegación
  const navigate = useNavigate();
  // Hook personalizado para manejar la autenticación
  const { login } = useAuth();

  // Estados para manejar el formulario y errores
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Guardar el token en localStorage
        localStorage.setItem('authToken', data.token);
        
        // Crear objeto de usuario con la información recibida
        const userData = {
          ...data.user,
          token: data.token,
          roles: data.roles
        };
        // ✅ CRÍTICO: Guardar también en localStorage con el nombre que MyProfile espera
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Usar la función login del contexto
        login(userData);
        
        console.log('Login exitoso:', userData);
        navigate('/');
      } else {
        const errorData = await response.text();
        setError(errorData || 'Email o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error al intentar iniciar sesión. Verifique su conexión.');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <Box className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="login-label">E-mail</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Ingresa tu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="login-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Ingresa tu contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Continuar'}
        </button>
      </form>

      <div className="register-link">
        <p>¿No tiene un usuario creado?</p>
        <Link to="/register">Crear cuenta</Link>
      </div>
    </Box>
  );
}

export default UsersLogin;