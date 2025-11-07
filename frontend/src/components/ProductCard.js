import { updateProductStock } from '../services/productService';

const addToCart = async (product, quantity = 1) => {
  try {
    // Verificar stock disponible
    if (product.stock < quantity) {
      alert('Stock insuficiente');
      return;
    }

    // Actualizar stock en el backend
    await updateProductStock(product.id, quantity, 1);

    // Calcular el precio final (con descuento si corresponde)
    let finalPrice = product.precio;
    if (product.price !== undefined) {
      finalPrice = product.price; // Usar el precio con descuento si existe
    }

    // Agregar al carrito local
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({
        id: product.id,
        name: product.nombre,
        price: finalPrice,
        quantity: quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    alert('Producto agregado al carrito');

  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    alert('Error al agregar producto al carrito: ' + error.message);
  }
};