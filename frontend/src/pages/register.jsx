// Importación de dependencias necesarias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './users.css';
import { TextField, Button, Box } from '@mui/material';

// Componente principal para el registro de usuarios
function Register() {
    // Hook de navegación
    const navigate = useNavigate();
    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        usuario: '',
        password: '',
        telefono: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        // Validaciones del lado del cliente
        if (!formData.email.includes('@')) {
            setError('Por favor ingrese un email válido');
            setLoading(false);
            return;
        }
        
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const userData = await response.json();
                alert('Usuario registrado exitosamente');
                console.log('Usuario registrado:', userData);
                navigate('/login');
            } else {
                const errorText = await response.text();
                if (response.status === 409) {
                    setError('Ya existe un usuario registrado con este email');
                } else {
                    setError(errorText || 'Error al registrar usuario');
                }
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            setError('Error de conexión. Verifique su conexión a internet.');
        } finally {
            setLoading(false);
        }
    };

    // Renderizado del componente
    return (
        <>

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Complete los datos solicitados
            </p>

            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    marginTop: 4,
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: 'flex',
                }}  
            >
                <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem', width: '100%' }}>
                    {error && (
                        <div style={{ 
                            color: 'red', 
                            marginBottom: '1rem', 
                            padding: '0.5rem', 
                            border: '1px solid red', 
                            borderRadius: '4px',
                            backgroundColor: '#ffebee'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="nombre" style={{ marginRight: '1rem', width: '100px' }}>Nombre:</label>
                        <TextField 
                            id="nombre" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.nombre}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="apellido" style={{ marginRight: '1rem', width: '100px' }}>Apellido:</label>
                        <TextField 
                            id="apellido" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.apellido}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ marginRight: '1rem', width: '100px' }}>Email:</label>
                        <TextField 
                            id="email" 
                            type="email" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="telefono" style={{ marginRight: '1rem', width: '100px' }}>Teléfono:</label>
                        <TextField 
                            id="telefono" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.telefono}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="usuario" style={{ marginRight: '1rem', width: '100px' }}>Usuario:</label>
                        <TextField 
                            id="usuario" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.usuario}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="password" style={{ marginRight: '1rem', width: '100px' }}>Contraseña:</label>
                        <TextField 
                            id="password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>

                    <Button 
                        type="submit" 
                        variant="outlined" 
                        fullWidth 
                        disabled={loading}
                        sx={{ 
                            mt: 2, 
                            color: 'black', 
                            borderColor: 'black', 
                            backgroundColor: 'white'
                        }}
                    >
                        {loading ? 'Registrando...' : 'Confirmar'}
                    </Button>
                </form>
            </Box>
        </>
    );
}

export default Register;