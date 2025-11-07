import { updateProductStock } from '../services/productService';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (productId, newQuantity, currentQuantity) => {
    if (newQuantity < 1) return;
    
    setLoading(true);
    try {
      const diferencia = newQuantity - currentQuantity;
      const operacion = diferencia > 0 ? 1 : -1; // 1 si aumenta, -1 si disminuye
      const cantidadCambio = Math.abs(diferencia);

      // Actualizar stock en el backend
      await updateProductStock(productId, cantidadCambio, operacion);

      // Actualizar el carrito localmente
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      // También actualizar en localStorage si lo usas
      const updatedCart = cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));

    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      alert('Error al actualizar la cantidad: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, quantity) => {
    setLoading(true);
    try {
      // Devolver todo el stock al producto
      await updateProductStock(productId, quantity, -1);

      // Remover del carrito
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

    } catch (error) {
      console.error('Error al remover producto:', error);
      alert('Error al remover producto del carrito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      {loading && <div className="loading">Actualizando...</div>}
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <div className="quantity-controls">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1, item.quantity)}
              disabled={loading || item.quantity <= 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1, item.quantity)}
              disabled={loading}
            >
              +
            </button>
          </div>
          <button 
            onClick={() => removeFromCart(item.id, item.quantity)}
            disabled={loading}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};