export const updateProductStock = async (productId, cantidad, operacion) => {
  try {
    const response = await fetch(`${API_BASE_URL}/partidas/${productId}/stock`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cantidad: cantidad,
        operacion: operacion // 1 para decrementar stock, -1 para incrementar stock
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar stock');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};