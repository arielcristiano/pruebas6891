// Importación de dependencias necesarias
import React from "react";
import { useNavigate } from "react-router-dom";
// 🔑 Importación de useAuth para acceder al estado de autenticación
import { useAuth } from '../context/AuthContext'; 

// Importación de componentes de Material-UI
import {
  Avatar,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from "@mui/material";
// Importación de iconos de Material-UI
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
// Importación de estilos
import "./myprofile.css";
import "./users.css";

// Componente del perfil de usuario
const MyProfile = () => {
  // 🔑 Obtener el estado del usuario y el estado de carga del contexto
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  // 🛑 Lógica para manejar la carga y la redirección
  // 1. Mostrar estado de carga mientras el AuthContext revisa el localStorage
  if (loading) {
    return <div>Cargando perfil...</div>;
  }
  
  // 2. Si la carga terminó y no hay usuario, redirigir al login
  if (!currentUser) {
    navigate("/login");
    return null; // Detener el renderizado
  }
  
  // NOTA: El useEffect anterior para leer localStorage ya no es necesario
  
  // Función para obtener las iniciales del usuario para el avatar
  const getInitials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  // Función para navegar a la gestión de productos
  const handlePublicacionesClick = () => {
    navigate('/gestion-productos');
  };

  // Usamos 'currentUser' como la fuente de datos
  const userData = currentUser;

  // Renderizado del componente
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }} >
        {/* Panel principal del perfil */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor:"#f0f0f0", borderRadius:2 }}>
          {/* Cabecera con avatar y nombre */}
          <Box display="flex" alignItems="center" mb={3} backgroundColor="lightgrey" borderRadius={2} p={2}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "black",
                fontSize: "2.5rem",
                mr: 3
              }}
            >
              {getInitials(userData.nombre, userData.apellido)}
            </Avatar>
            <Box>
              <Typography variant="h4">
                {userData.nombre} {userData.apellido}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                @{userData.usuario}
              </Typography>
            </Box>
          </Box>

          {/* Grid con acordeones de información */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Acordeón de datos personales */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <Typography variant="h6">Datos Personales</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={userData.email}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Teléfono"
                        secondary={userData.telefono}
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Acordeón de compras */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <Typography variant="h6">Rango</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={userData.rango}
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Acordeón de publicaciones */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon>
                    <StorefrontIcon />
                  </ListItemIcon>
                  <Typography variant="h6">Mis Publicaciones</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handlePublicacionesClick}
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#333'
                      }
                    }}
                  >
                    Ver mis publicaciones
                  </Button>
                </AccordionDetails>
              </Accordion>

              {/* Acordeón de privacidad */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <Typography variant="h6">Privacidad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Visibilidad del perfil"
                        secondary="Público"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Información visible"
                        secondary="Nombre y publicaciones"
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Acordeón de seguridad */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <Typography variant="h6">Seguridad</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Última actualización de contraseña"
                        secondary="Nunca"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Verificación en dos pasos"
                        secondary="Desactivada"
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default MyProfile;