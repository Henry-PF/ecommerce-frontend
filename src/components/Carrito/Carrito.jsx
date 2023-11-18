import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito, actualizarCarrito } from '../../redux/actions';
import axios from 'axios';

const Carrito = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const idCarrito = localStorage.getItem('id_carrito');
  const carrito = useSelector(state => state.carrito);

  useEffect(() => {
    if (userId) {
      dispatch(getCarrito(userId, idCarrito));
    }
  }, [dispatch, userId, idCarrito]);

  const handleActualizarCarrito = (carritoActualizado) => {
    dispatch(actualizarCarrito(userId, carritoActualizado, idCarrito));
  };

  const handlePayButtonClick = async () => {
    try {
      if (!userId || !idCarrito) {
        console.error('ID de usuario o ID de carrito no encontrados. Usuario no autenticado o carrito no válido.');
        return;
      }
      const response = await axios.post('/pago/create-order', { id_user: userId, id_carrito: idCarrito });
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
    {item.detalle_carritos[0] && item.detalle_carritos[0].producto ? (
      <>
        <p>Nombre: {item.detalle_carritos[0].producto.nombre}</p>
        <p>Cantidad: {item.detalle_carritos[0].cantidad}</p>
        <p>Subtotal: {item.detalle_carritos[0].subtotal}</p>
        {/* Otros detalles del producto */}
      </>
    ) : (
      <p>Detalles del producto no disponibles</p>
    )}
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
