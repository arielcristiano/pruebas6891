// Importación de dependencias necesarias
import React from "react";
import ReactDOM from "react-dom/client";
// Importación de estilos globales
import "./pages/Index.css";
// Importación del componente principal de la aplicación
import App from "./App";

// Creación del punto de entrada de la aplicación React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizado de la aplicación envuelta en StrictMode para detección de problemas
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
