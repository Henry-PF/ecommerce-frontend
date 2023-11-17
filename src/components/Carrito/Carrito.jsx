import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito, actualizarCarrito } from '../../redux/actions';
import axios from 'axios';

const Carrito = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const carrito = useSelector(state => state.carrito);

  useEffect(() => {
    if (userId) {
      dispatch(getCarrito(userId));
    }
  }, [dispatch, userId]);

  const handleActualizarCarrito = (carritoActualizado) => {
    dispatch(actualizarCarrito(userId, carritoActualizado));
  };

  const handlePayButtonClick = async () => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('ID de usuario no encontrado. Usuario no autenticado.');
        return;
      }
      const response = await axios.post('/pago/create-order', { id_user: userId });
      // window.open(`https://www.paypal.com/checkoutnow?token=${response.data.order_id}`, '_blank');
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito ? (
        <div>
          {/* Renderizar los elementos del carrito aquí */}
          {carrito.map(item => (
            <div key={item.id}>
              <p>{item.detalle_carritos[0].producto.nombre}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Subtotal: {item.subtotal}</p>
              {/* Otros detalles del producto */}
            </div>
          ))}
          <div>
            <button onClick={() => handleActualizarCarrito([...carrito, { /* Nuevo item de carrito */ }])}>
              Agregar al Carrito
            </button>
            <button onClick={handlePayButtonClick}>
              Pagar con PayPal
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontró el carrito</p>
      )}
    </div>
  );
};

export default Carrito;
