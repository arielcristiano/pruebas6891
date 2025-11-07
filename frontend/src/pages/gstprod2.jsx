import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./gstprod2.css";
import "./users.css";

// Componente para la gestión de productos del usuario
const Gstprod2 = () => {
  // Obtiene el usuario actual del contexto de autenticación
  const { currentUser, getAuthToken } = useAuth();
  const navigate = useNavigate();
  // Estados para manejar los productos, carga, edición de descripción
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDescription, setEditingDescription] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  //Token para eliminar producto
  const token = getAuthToken();
  //variable para guardar el precioy el id auxiliar
  const [newPrecio, setNewPrecio] = useState("");
  //TODO

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Obtiene todos los productos del backend
        const response = await fetch("http://localhost:8080/api/partidas");
        const allProducts = await response.json();

        // Obtiene el producto recientemente creado del almacenamiento local
        const newProductData = localStorage.getItem("productData");
        if (newProductData) {
          const parsedProduct = JSON.parse(newProductData);

          // Crea un nuevo producto en el backend
          const createResponse = await fetch(
            "http://localhost:8080/api/partidas",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...parsedProduct,
                id: Date.now().toString(),
                userId: currentUser.id,
                price: 0,
                brand: parsedProduct.marca,
                name: `${parsedProduct.marca} ${parsedProduct.categoria}`,
                category: parsedProduct.categoria,
              }),
            }
          );

          if (createResponse.ok) {
            // Limpia el almacenamiento local después de una creación exitosa
            localStorage.removeItem("productData");
          }
        }

        // Recarga los productos para obtener la lista actualizada incluyendo el nuevo
        const updatedResponse = await fetch(
          "http://localhost:8080/api/partidas"
        );
        const updatedProducts = await updatedResponse.json();

        // Filtra los productos por el usuario actual (usando el objeto usuario.id)
        const userProducts = updatedProducts.filter(
          (product) => product.usuario && product.usuario.id === currentUser.id
        );
        setProducts(userProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentUser?.id]);

  // Función para actualizar el stock de un producto
  const updateStock = async (productId, newStock) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/partidas/${productId}/stock`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            stock: newStock,
          }),
        }
      );

      if (response.ok) {
        // Actualiza el estado local con el nuevo stock
        setProducts(
          products.map((product) =>
            product.id === productId ? { ...product, stock: newStock } : product
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };

  const cambiarLocal = (productId, newPrice) => {
    setProducts(
      products.map((producto) =>
        producto.id === productId
          ? { ...producto, precio: parseInt(newPrice) || 0 }
          : producto
      )
    );
  };

  // Función para eliminar un producto
  const handleDeleteProduct = async (productId) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/partidas/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // Elimina el producto del estado local
          setProducts(products.filter((product) => product.id !== productId));
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  // Funciones para manejar la edición de la descripción
  const handleEditDescription = (productId) => {
    const product = products.find((p) => p.id === productId);
    setEditingDescription(productId);
    setNewDescription(product.descripcion || product.description || "");
  };

  // Función para guardar la descripción editada
  const handleSaveDescription = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/partidas/${productId}/descripcion`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            descripcion: newDescription,
          }),
        }
      );

      if (response.ok) {
        // Actualiza el estado local con la nueva descripción
        setProducts(
          products.map((product) =>
            product.id === productId
              ? { ...product, descripcion: newDescription }
              : product
          )
        );
        setEditingDescription(null);
      }
    } catch (error) {
      console.error("Error al actualizar la descripción:", error);
    }
  };

  // Muestra mensaje de carga mientras se obtienen los productos
  if (loading) {
    return <div className="centered-message">Cargando publicaciones...</div>;
  }

  // Muestra mensaje cuando no hay productos y botón para crear uno nuevo
  if (products.length === 0) {
    return (
      <div className="centered-container">
        <div className="no-products-message">
          <h2>No tienes publicaciones aún</h2>
          <p>¡Comienza a vender tus productos!</p>
          <button
            className="create-product-button"
            onClick={() => navigate("/nueva-publicacion")}
          >
            Crear Nueva Publicación
          </button>
        </div>
      </div>
    );
  }

  // Renderiza la lista de productos con sus detalles y opciones de gestión
  // e agrega la posicion
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div key={product.id} className="product-card">
          <div className="product-left">
            <div className="product-gallery">
              {/* Operador && para renderizado condicional */}
              {product.imagen && (
                <img
                  src={product.imagen}
                  alt="Imagen del producto"
                  className="main-image"
                />
              )}
            </div>

            <div className="product-description">
              <h2>Descripción</h2>
              {editingDescription === product.id ? (
                <div className="edit-description">
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="description-textarea"
                  />
                  <div className="description-actions">
                    <button
                      onClick={() => handleSaveDescription(product.id)}
                      className="save-description-button"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingDescription(null)}
                      className="cancel-edit-button"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{product.descripcion || product.description}</p>
                  <button
                    onClick={() => handleEditDescription(product.id)}
                    className="edit-description-button"
                  >
                    Editar descripción
                  </button>
                </>
              )}
            </div>

            <div className="product-characteristics">
              <h2>Características del producto</h2>
              <div className="characteristics-grid">
                <div className="characteristics-main">
                  <table>
                    <tbody>
                      <tr>
                        <td>Marca</td>
                        <td>{product.marca}</td>
                      </tr>
                      <tr>
                        <td>Categoría</td>
                        <td>{product.categoria}</td>
                      </tr>
                      <tr>
                        <td>Talle</td>
                        <td>{product.talle}</td>
                      </tr>
                      <tr>
                        <td>Estado</td>
                        <td>{product.estado}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="product-right">
            <div className="product-info-card">
              <div className="product-condition">Gestión de Producto</div>
              <h1 className="product-title">{product.name}</h1>
              {/* TODO */}
              <div className="price-info-section">
                <h3>Precio Actual: ${product.precio}</h3>
                <div className="price-input-section">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={product.precio}
                    onChange={(e) => cambiarLocal(product.id, e.target.value)}
                    className="price-input"
                  />
                </div>
                <button
                  className="add-stock-button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(product.id, product.precio);
                    updatePrice(product.id, product.precio);
                  }}
                >
                  Confirmar Precio
                </button>
              </div>

              <div className="stock-info-section">
                <h3>Stock Actual: {product.stock} unidades</h3>

                <div className="stock-actions">
                  <button
                    onClick={() =>
                      updateStock(product.id, Number(product.stock) + 1)
                    }
                    className="add-stock-button"
                  >
                    Aumentar Stock (+1)
                  </button>
                  <button
                    onClick={() =>
                      updateStock(
                        product.id,
                        Math.max(0, Number(product.stock) - 1)
                      )
                    }
                    className="remove-stock-button"
                    disabled={product.stock <= 0}
                  >
                    Disminuir Stock (-1)
                  </button>
                </div>
              </div>

              <div className="delete-section">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="delete-product-button"
                >
                  Eliminar Publicación
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gstprod2;
