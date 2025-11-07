import { Link, useNavigate } from "react-router-dom";
import styles from "./listaCatalogo.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useState, useEffect } from 'react';
import { buscarPartidas } from '../services/partidaService';

// Componente principal que muestra el catálogo de productos
function ListaCatalogo() {
  const navigate = useNavigate();
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para manejar errores de carga
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState(''); // Estado para la barra de búsqueda
  // Filtros específicos para partidas
  const [juego, setJuego] = useState('');
  const [region, setRegion] = useState('');
  const [rangoMin, setRangoMin] = useState('');
  const [rangoMax, setRangoMax] = useState('');
  const [fecha, setFecha] = useState('');
  const [latenciaMax, setLatenciaMax] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hook de efecto para cargar los productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch (partidas) using the new service
        const partidaData = await buscarPartidas({ page: 1, pageSize: 100 });
        console.log("Partidas recibidas:", partidasData);
        // backend returns an array; sort by nombre if present
        const sortedProducts = Array.isArray(partidasData)
          ? partidasData.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
          : [];
        setProducts(sortedProducts);

        // Fetch categorías desde el endpoint específico (optional)
        console.log("Fetching categories from /api/regions");  // Logging para debugging
const categoriasResponse = await fetch('http://localhost:8080/api/regions');
if (!categoriasResponse.ok) {
  const text = await categoriasResponse.text();  // Obtén el texto de la respuesta
  console.error(`Error fetching categories: ${categoriasResponse.status} ${categoriasResponse.statusText}, body: ${text}`);
  // Si las categorías no son críticas, continúa sin error; de lo contrario, lanza uno
  setCategories([]);  // O maneja como prefieras
} else {
  const categoriasData = await categoriasResponse.json();
  console.log("Categories received:", categoriasData);  // Logging exitoso
  setCategories(categoriasData);
}

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Error al cargar partidas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para manejar el clic en una partida
  const handleProductClick = (productId) => {
    navigate(`/partidas/${productId}`);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filtrar partidas según la categoría(esports) seleccionada y el texto de búsqueda
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory 
    ? product.categorias?.some(cat => cat.id === parseInt(selectedCategory))
    : true;
  const matchesSearch = product.juego?.toLowerCase().includes(searchText.toLowerCase());
  return matchesCategory && matchesSearch;
});

  // Ejecuta la búsqueda con filtros hacia el backend
  const aplicarFiltros = async () => {
    try {
      setLoading(true);
      setError(null);
      const payload = {
        juego: juego || undefined,
        region: region || undefined,
        rangoMin: rangoMin !== '' ? rangoMin : undefined,
        rangoMax: rangoMax !== '' ? rangoMax : undefined,
        fecha: fecha || undefined,
        latenciaMax: latenciaMax !== '' ? latenciaMax : undefined,
        page: 1,
        pageSize: 100
      };
      const data = await buscarPartidas(payload);
      const sorted = Array.isArray(data) ? data.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || '')) : [];
      setProducts(sorted);
    } catch (err) {
      console.error('Error al aplicar filtros:', err);
      setError(err.message || 'Error al aplicar filtros');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <>
      <div className="homeScreen">
        <section className={styles.seccionPrincipal}>
          <h2 className={styles.tituloDiv}>Partidas</h2>
          <div className={styles.filtroBusqueda}>
            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="Buscar partidas..."
              value={searchText}
              onChange={handleSearchChange}
              className={styles.inputBusqueda}
            />
            {/* Filtros para partidas */}
            <input
              type="text"
              placeholder="Juego (ej. valorant)"
              value={juego}
              onChange={(e) => setJuego(e.target.value)}
              className={styles.inputBusqueda}
              style={{ marginLeft: 8 }}
            />
            <input
              type="text"
              placeholder="Región (ej. EU)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={styles.inputBusqueda}
              style={{ marginLeft: 8 }}
            />
            <input
              type="number"
              placeholder="Rango min"
              value={rangoMin}
              onChange={(e) => setRangoMin(e.target.value)}
              className={styles.inputBusqueda}
              style={{ width: 110, marginLeft: 8 }}
            />
            <input
              type="number"
              placeholder="Rango max"
              value={rangoMax}
              onChange={(e) => setRangoMax(e.target.value)}
              className={styles.inputBusqueda}
              style={{ width: 110, marginLeft: 8 }}
            />
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className={styles.inputBusqueda}
              style={{ marginLeft: 8 }}
            />
            <input
              type="number"
              placeholder="Latencia max (ms)"
              value={latenciaMax}
              onChange={(e) => setLatenciaMax(e.target.value)}
              className={styles.inputBusqueda}
              style={{ width: 160, marginLeft: 8 }}
            />
            <button onClick={aplicarFiltros} className={styles.botonVer} style={{ marginLeft: 8 }}>Filtrar</button>
          </div>
          <hr className={styles.separador} />
          {loading && <p>Cargando partidas...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {filteredProducts.length === 0 && !loading && <p>No se encontraron partidas.</p>}
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <div className={styles.tarjetaProducto}>
                <div className={styles.imagen}> 
                  {product.imagen ? (
                    <img src={product.imagen} alt={product.name} />
                  ) : (
                    <p className={styles.texto}>Imagen no disponible</p>
                  )}
                </div>
                <div className={styles.descrpicion}>
                  <h4>{product.juego}</h4>
                  <p className={styles.texto}>{product.descripcion || product.description}</p>
                </div>
                <div className={styles.comfirmar}>
                  <button className={styles.botonVer}>Ver</button>
                </div>
              </div>
              <hr className={styles.separador} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default ListaCatalogo;