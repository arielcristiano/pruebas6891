// Importación de dependencias de Material-UI necesarias
import React from "react";
import { Box, Container, Typography } from "@mui/material";

// Componente del pie de página responsive
function ResponsiveFooter() {
  // Renderizado del componente
  return (
    // Box principal del footer con estilos base
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0D0D0D", // Color de fondo negro
        color: "white",            // Color de texto blanco
        py: 2,                     // Padding vertical
        mt: "auto",               // Margen superior automático para mantener el footer abajo
      }}
    >
      {/* Contenedor con ancho máximo y estilos de flexbox */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* Título de soporte técnico */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            fontFamily: "monospace",
          }}
        >
          Soporte Técnico
        </Typography>

        {/* Contenedor de información de contacto */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Columna en móvil, fila en desktop
            gap: 2,
          }}
        >
          {/* Teléfono de contacto */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            Teléfono: +54 11 1234-5678
          </Typography>

          {/* Correo de contacto */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              color: "white",
              fontFamily: "monospace",
            }}
          >
            Correo: soporte@nombreweb.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default ResponsiveFooter;