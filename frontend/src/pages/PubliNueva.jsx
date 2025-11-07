// Importación de dependencias necesarias
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./publinueva.css";
import "./users.css";

// Componente para crear una nueva publicación de producto
function PubliNueva() {
  // Hook de navegación
  const navigate = useNavigate();
  const { currentUser, getAuthToken } = useAuth();

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    juego: "",
    region: "",
    rangoMin: "",
    rangoMax: "",
    fecha: "",
    latencia: "",
    descripcion: "",
    imagen: "",
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  // Función para manejar la carga de imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imagen: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, index) => index !== indexToRemove),
      imagen:
        indexToRemove === 0 && prev.imagenes.length > 1
          ? prev.imagenes[1] // Si se elimina la primera imagen y hay más, usar la segunda
          : prev.imagen, // Si no, mantener la imagen actual
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Verificar si hay un usuario autenticado
      if (!currentUser) {
        setError("Debe iniciar sesión para publicar");
        navigate("/login");
        return;
      }

      // Obtener el token de autenticación
      const token = getAuthToken();
      if (!token) {
        setError(
          "Token de autenticación no encontrado. Por favor, inicie sesión nuevamente."
        );
        navigate("/login");
        return;
      }

       // Validaciones del lado del cliente
      if (parseInt(formData.rangoMin) > parseInt(formData.rangoMax)) {
        setError("El rango mínimo no puede ser mayor al rango máximo");
        setLoading(false);
        return;
      }

      // Validar que la fecha no sea en el pasado
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (fechaSeleccionada < hoy) {
        setError("La fecha no puede ser en el pasado");
        setLoading(false);
        return;
      }

      // Preparar datos de la nueva partida según el modelo Scrim
      const nuevaPartida = {
        juego: formData.juego,
        region: formData.region,
        rango: parseInt(formData.rangoMin), // Usamos rangoMin como el rango base
        fecha: `${formData.fecha}T12:00:00`, // Convertir a LocalDateTime
        latencia: parseInt(formData.latencia),
        descripcion: formData.descripcion,
        imagen: formData.imagen || null,
      };

      console.log("Enviando partida:", nuevaPartida);


      // Enviar petición al servidor para crear el producto
      const response = await fetch("http://localhost:8080/api/partidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevaPartida),
      });

      if (response.ok) {
        const savedPartida = await response.json();
        console.log("Partida creada:", savedPartida);
        alert("Partida creada exitosamente");
        navigate("/partidas");
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);

        if (response.status === 401) {
          setError(
            "Su sesión ha expirado. Por favor, inicie sesión nuevamente."
          );
          navigate("/login");
        } else if (response.status === 403) {
          setError("No tiene permisos para crear partidas.");
        } else {
          setError(`Error al guardar el partida: ${errorText}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error de conexión. Verifique su conexión a internet.");
    } finally {
      setLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit} className="producto-form">
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Crear Nueva Partida
        </h2>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "1rem",
              padding: "0.5rem",
              border: "1px solid red",
              borderRadius: "4px",
              backgroundColor: "#ffebee",
            }}
          >
            {error}
          </div>
        )}

        {/* Sección de juego */}
        <div className="form-section">
          <label>
            Juego:
            <select
              name="juego"
              value={formData.juego}
              onChange={handleInputChange}
              className="categoria-select"
              disabled={loading}
              required
            >
              <option value="">Seleccione un juego</option>
              <option value="Valorant">Valorant</option>
              <option value="League of Legends">League of Legends</option>
              <option value="CS2">Counter-Strike 2</option>
              <option value="Dota 2">Dota 2</option>
              <option value="Overwatch 2">Overwatch 2</option>
              <option value="Rainbow Six Siege">Rainbow Six Siege</option>
              <option value="Rocket League">Rocket League</option>
              <option value="Fortnite">Fortnite</option>
            </select>
          </label>
        </div>

        {/* Sección de región */}
        <div className="form-section">
          <label>
            Región:
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
            >
              <option value="">Seleccione una región</option>
              <option value="NA">Norteamérica (NA)</option>
              <option value="LAN">Latinoamérica Norte (LAN)</option>
              <option value="LAS">Latinoamérica Sur (LAS)</option>
              <option value="BR">Brasil (BR)</option>
              <option value="EU">Europa (EU)</option>
              <option value="EUW">Europa Oeste (EUW)</option>
              <option value="EUNE">Europa Nórdica y Este (EUNE)</option>
              <option value="KR">Corea (KR)</option>
              <option value="JP">Japón (JP)</option>
              <option value="OCE">Oceanía (OCE)</option>
              <option value="SEA">Sudeste Asiático (SEA)</option>
            </select>
          </label>
        </div>

        {/* Sección de rangos */}
        <div className="form-section">
          <label>
            Rango mínimo (MMR/ELO):
            <input
              type="number"
              name="rangoMin"
              min="0"
              max="10000"
              value={formData.rangoMin}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
              placeholder="Ej: 1000"
            />
          </label>
        </div>

        <div className="form-section">
          <label>
            Rango máximo (MMR/ELO):
            <input
              type="number"
              name="rangoMax"
              min="0"
              max="10000"
              value={formData.rangoMax}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
              placeholder="Ej: 3000"
            />
          </label>
        </div>

        {/* Sección de fecha */}
        <div className="form-section">
          <label>
            Fecha de la partida:
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
              min={new Date().toISOString().split('T')[0]}
            />
          </label>
        </div>

        {/* Sección de latencia */}
        <div className="form-section">
          <label>
            Latencia máxima (ms):
            <input
              type="number"
              name="latencia"
              min="1"
              max="300"
              value={formData.latencia}
              onChange={handleInputChange}
              disabled={loading}
              required
              className="input-field-compact"
              placeholder="Ej: 50"
            />
          </label>
        </div>

        {/* Sección de imagen */}
        <div className="form-section">
          <label>
            Imagen de la partida (opcional):
            <input
              type="file"
              name="imagen"
              onChange={handleImageChange}
              accept="image/*"
              disabled={loading}
              className="input-field-compact"
            />
          </label>
          {formData.imagen && (
            <div className="preview-images">
              <img
                src={formData.imagen}
                alt="Vista previa"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  margin: "10px 0",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>

        {/* Sección de descripción */}
        <div className="form-section descripcion-container">
          <label>
            Descripción de la partida:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="input-descripcion"
              disabled={loading}
              required
              placeholder="Describe los detalles de la partida, reglas especiales, etc."
            />
          </label>
          <button type="submit" className="checkout-button" disabled={loading}>
            {loading ? "Creando partida..." : "Crear Partida"}
          </button>
        </div>
      </form>
    </main>
  );
}


export default PubliNueva;
