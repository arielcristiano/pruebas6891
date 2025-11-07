// Importación de dependencias y componentes de Material-UI necesarios
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

// 🛑 IMPORTACIONES: Si usas tu logo real, descomenta y ajusta esta línea
// import logo from '../img/logo.png'; 
import AdbIcon from '@mui/icons-material/Adb'; // Ícono temporal

// 🟢 CORRECCIÓN DE RUTA (TERCER INTENTO): Asumimos que AuthContext.jsx está en la carpeta superior (e.g., /src/AuthContext.jsx)
import { useAuth } from '../context/AuthContext.jsx'; 

// Componente principal de la barra de navegación
function ResponsiveAppBar() {
  // Estados para manejar los menús desplegables
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  // Hooks para navegación y autenticación
  const { isAuthenticated, currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  // ---------------------------------------------------------------------
  // 🟢 DIAGNÓSTICO CLAVE: Agregamos un useEffect para monitorear el estado de autenticación.
  // Revisa la consola para ver si el estado cae a 'false' al navegar al home.
  React.useEffect(() => {
    if (loading === false) {
      console.log(
        `[Auth Status Check] - isAuthenticated: ${isAuthenticated}, User ID: ${currentUser ? currentUser.id || currentUser.usuario : 'None'}`
      );
    } else if (loading === true) {
        console.log(`[Auth Status Check] - State is currently loading...`);
    }
  }, [isAuthenticated, currentUser, loading]);
  // ---------------------------------------------------------------------

  // Manejo del estado de carga inicial
  
  let pages = [];
  const settings = ['Perfil', 'Cerrar Sesión']; 
  
  // Nota: Asumo que tu useAuth provee 'loading', si no existe, esta lógica fallará.
  const isAppLoading = loading === undefined ? false : loading; 

  if (isAppLoading) {
    // Estado de carga: Muestra enlaces básicos sin depender del usuario
    pages = ['Partidas'];
  } else {
    // Estado cargado: Define los enlaces según la autenticación
    pages = isAuthenticated 
      ? ['Partidas', 'Crear partida'] 
      : ['Partidas', 'Crear partida', 'Ingresar'];
  }
  // ---------------------------------------------------------------------

  // Funciones para manejar la apertura y cierre de menús
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    // Si está autenticado y no está cargando, abre el menú
    if (isAuthenticated && !isAppLoading) {
      setAnchorElUser(event.currentTarget);
    } else if (!isAuthenticated && !isAppLoading) {
      // Si no está autenticado, navega directamente al login al hacer click en el Avatar
      navigate('/login');
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Función para manejar las acciones del menú de usuario
  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    console.log(`🚨 ACCIÓN: Click en la opción de menú: ${setting}`);

    if (setting === 'Cerrar Sesión') {
      logout(); // Llama al logout real
      console.log("✅ Logout invocado desde ResponsiveAppBar.");
      navigate('/');
    } else if (setting === 'Perfil') {
      navigate('/perfil');
    }
  };

  // Función para manejar la navegación según la página seleccionada
  const handlePageClick = (page) => {
    switch (page) {
        case 'Partidas':
            navigate('/partidas');
            break;
        case 'Crear partida':
            // Si no está cargando y no está autenticado, redirige a login
            if (!isAppLoading && !isAuthenticated) {
                navigate('/login');
            } else {
                navigate('/crear-partida');
            }
            break;
        case 'Ingresar':
            // Solo navegamos, ya no necesitamos simular el login.
            navigate('/login');
            break;
        default:
            break;
    }
    handleCloseNavMenu();
  };

  // Función para obtener las iniciales del usuario
  const getInitials = () => {
    // Usamos el currentUser real del AuthContext
    if (currentUser && currentUser.nombre && currentUser.apellido) {
      return `${currentUser.nombre[0]}${currentUser.apellido[0]}`.toUpperCase();
    }
    // Fallback: si existen, intentamos usar las dos primeras letras del 'usuario' o 'id'
    if (currentUser && currentUser.usuario) {
      return currentUser.usuario.substring(0, 2).toUpperCase();
    }
    if (currentUser && currentUser.id) {
        return currentUser.id.substring(0, 2).toUpperCase();
    }
    return 'U'; // Inicial por defecto
  };

  // Si está cargando, renderizamos la barra con un indicador de carga en el lugar del avatar
  if (isAppLoading) {
    return (
      <AppBar position="static" sx={{ backgroundColor: '#0D0D0D' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo de Carga Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              <AdbIcon sx={{ mr: 1 }} /> 
              <Typography
                variant="h6" noWrap component="a" href="/"
                sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}
              >
                eSports
              </Typography>
            </Box>

            {/* Menú de navegación desktop - solo enlaces públicos visibles durante la carga */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button key="Partidas" onClick={() => navigate('/partidas')} sx={{ my: 2, color: 'white', display: 'block' }}>Partidas</Button>
            </Box>

            {/* Avatar/Perfil - Indicador de Carga */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Se usa '...' para indicar que se está cargando */}
              <Avatar sx={{ bgcolor: 'grey.700', width: 40, height: 40 }}>...</Avatar>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }


  // Renderizado del componente (Estado final: cargado o no autenticado)
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D0D0D' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo y nombre de la marca (Desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6" noWrap component="a" href="/"
              sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}
            >
              eSports
            </Typography>
          </Box>

          {/* Menú móvil */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menú"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo y nombre versión móvil */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5" noWrap component="a" href="/"
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}
          >
            eSports
          </Typography>

          {/* Menú de navegación desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Iconos de carrito y perfil */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Carrito de compras">
              <IconButton onClick={() => navigate('/carrito')} sx={{ color: 'white' }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={isAuthenticated ? "Abrir configuración" : "Ir a Login"}>
              <IconButton onClick={isAuthenticated ? handleOpenUserMenu : () => navigate('/login')} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: isAuthenticated ? 'primary.main' : '#0D0D0D', borderRadius: isAuthenticated ? '50%' : 0, width: 40, height: 40, backgroundColor: isAuthenticated ? "darkgreen" : "black" }}>
                  {isAuthenticated ? getInitials() : 'Login'}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            {/* Menú de usuario */}
            {isAuthenticated && (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
