// Importación de dependencias necesarias
import React, { useState, useEffect } from "react";
import "./homescreen.css";
import { useNavigate } from "react-router-dom";

// Componente principal de la página de inicio
const HomeScreen = () => {
    // Hook para la navegación entre rutas
    const navigate = useNavigate();
    // Estados para manejar la búsqueda y partidas
    const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
    const [featuredProducts, setFeaturedProducts] = useState([]); // Estado para partidas destacados
    const [allProducts, setAllProducts] = useState([]); // Estado para todas los partidas
    const [showSearchResults, setShowSearchResults] = useState(false); // Estado para mostrar/ocultar resultados

    // Objeto con los descuentos fijos para los partidas destacadas
    const PRODUCT_DISCOUNTS = {
        "1": 15,  // Remera Clásica Negra: 15% descuento
        "2": 25,  // Pantalón Jean Clásico: 25% descuento
        "3": 20,  // Campera de Cuero: 20% descuento
        "4": 30,  // Bermuda Cargo: 30% descuento
        "5": 10,  // Camisa Manga Larga: 10% descuento
        "6": 15   // Pantalón Deportivo: 15% descuento
    };

    // Hook de efecto para cargar los productos al montar el componente
    useEffect(() => {
        // Función asíncrona para obtener los productos del servidor
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/partidas');
                const data = await response.json();
                 // Normalizar los datos antes de procesarlos
                const normalizedData = data.map(scrim => ({
                ...scrim,
                name: scrim.juego || scrim.descripcion     // Manejar ambos nombres de propiedad
            }));
            
            setAllProducts(normalizedData);
            
            // Procesamiento de los primeros 6 productos para mostrarlos como destacados
            const productsWithDiscounts = normalizedData.slice(0, 5).map(product => {
                const discount = PRODUCT_DISCOUNTS[product.id];
                if (discount) {
                    const discountedPrice = product.price * (1 - discount / 100);
                    return {
                        ...product,
                        originalPrice: product.price,
                        price: Number(discountedPrice.toFixed(2)),
                        discount
                    };
                }
                return product;
            });
            
                setFeaturedProducts(productsWithDiscounts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, []);

    // Función para manejar el click en un producto y navegar a su detalle
    const handleProductClick = (productId) => {
        navigate(`/partidas/${productId}`);
    };

    // Función para manejar la búsqueda de productos
    const handleSearch = () => {
        setShowSearchResults(true);
    };

    // Función para filtrar productos según el texto de búsqueda
    const filterProducts = (products, searchText) => {
        if (!searchText.trim()) {
            return []; // Si no hay texto de búsqueda, devuelve un array vacío
        }
        // Filtra productos por nombre, descripción o categoría
        return products.filter(product => 
            (product.name && product.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (product.descripcion && product.descripcion.toLowerCase().includes(searchText.toLowerCase())) ||
            (product.description && product.description.toLowerCase().includes(searchText.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(searchText.toLowerCase()))
        );
    };

    // Obtener resultados de búsqueda filtrados
    const searchResults = filterProducts(allProducts, searchText);

    // Renderizado del componente
    return (
        <div className="homeScreen">
            {/* Barra de búsqueda */}
            <div className="barra-busqueda">
                <input
                    type="text"
                    placeholder="Buscar partidas..."
                    className="input-busqueda"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setShowSearchResults(false);
                    }}
                />
                <button className="btn-buscar" onClick={handleSearch}>Buscar</button>
            </div>

            {/* Sección condicional: Muestra resultados de búsqueda o partidas destacados */}
            {showSearchResults && searchText ? (
                // Sección de resultados de búsqueda
                <section className="productos-section">
                    <h2 className="productos-titulo">Resultados de búsqueda para "{searchText}"</h2>
                    <div className="productos-grid">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <div key={product.id} className="producto-card">
                                    <div className="producto-contenido">
                                        <div className="producto-imagen">
                                            {product.imagen ? (
                                                <img src={product.imagen} alt={product.name} />
                                            ) : (
                                                <p>Imagen no disponible</p>
                                            )}
                                        </div>
                                        <div className="producto-info">
                                            <h3>{product.nombre || product.name}</h3>
                                            <button 
                                                className="btn-ver"
                                                onClick={() => handleProductClick(product.id)}
                                            >
                                                Ver
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <p>No se encontraron productos para "{searchText}"</p>
                        )}
                    </div>
                </section>
            ) : (
                // Sección de partidas destacadas
                <section className="productos-section">
                    <h2 className="productos-titulo">Partidas Destacadas</h2>
                    <div className="productos-grid">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="producto-card">
                                <div className="producto-imagen">
                                    {product.imagen ? (
                                        <img src={product.imagen} alt={product.name} />
                                    ) : (
                                        <p>Imagen no disponible</p>
                                    )}
                                </div>
                                <div className="producto-info">
                                    <h3>{product.nombre || product.name}</h3>
                                    
                                    <button 
                                        className="btn-ver"
                                        onClick={() => handleProductClick(product.id)}
                                    >
                                        Ver
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomeScreen;