import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./products.css";
function Products() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
  
    const PRODUCT_DISCOUNTS = {
      "1": 15,
      "2": 25,
      "3": 20,
      "4": 30,
      "5": 10,
      "6": 15
    };
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/partidas/${id}`);
          const productData = await response.json();
          setProduct(productData); 
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
  
      fetchProduct();
    }, [id]);
    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = currentCart.findIndex(
          (item) => item.id === product.id
        );

        let updatedCart;
    if (existingProductIndex >= 0) {
      updatedCart = currentCart.map((item, index) => {
        if (index === existingProductIndex) {
          return {
            ...item,
            quantity: (item.quantity || 1) + selectedQuantity
          };
        }
        return item;
      });
    } else {
      const productToAdd = { ...product, quantity: selectedQuantity };
      updatedCart = [...currentCart, productToAdd];

    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/carrito");
  };

  const handleBuyNow = () => {
    const productToAdd = { ...product, quantity: selectedQuantity };
    const cart = [productToAdd];
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/carrito?showPayment=true");
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-page">
      <div className="product-layout">
        <div className="product-left">
          <div className="product-gallery">
            <img
              src={product.imagen}
              alt={product.name}
              className="main-image"
            />
            {product.discount && (
              <div className="discount-badge">{product.discount}% OFF</div>
            )}
            {product.imagenes && product.imagenes.length > 1 && (
              <div className="thumbnail-images">
                {product.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} vista ${index + 1}`}
                    className="thumbnail-image"
                    onClick={() => {
                      setProduct({ ...product, imagen: img });
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-description">
            <h2>Descripción</h2>
            <p>{product.descripcion || product.description}</p>
          </div>
        </div>
        <div className="product-right">
          <div className="product-info-card">
            <button className="btn-jugar" onClick={() => console.log("Jugar partida", product.id)}>
            Unite
          </button>
           </div>
        </div>

      </div>
    </div>
  );
}
export default Products;
