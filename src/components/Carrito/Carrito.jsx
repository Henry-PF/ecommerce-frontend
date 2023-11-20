import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarDelCarrito, getCarrito, actualizarCarrito } from '../../redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link
import './Carrito.css';

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

  const handleEliminarItem = (itemId) => {
    // Lógica para eliminar el item con el ID específico
    const carritoActualizado = carrito.filter(item => item.id !== itemId);
    handleActualizarCarrito(carritoActualizado);
  };

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
  console.log(carrito);

  return (
    <div>
      <h2>Carrito de Compras</h2>

      <div className="productos-container">
        {carrito.length > 0 && carrito[0]?.detalle_carritos?.length > 0 ? (
          carrito[0]?.detalle_carritos?.map(item => (
            <div key={item.id} className="producto-item">
              <p>Nombre: {item.producto?.nombre}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Subtotal: {item.subtotal}</p>
              <button onClick={() => handleEliminarItem(item.id)}>
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}

        <div className="acciones-carrito">
          {carrito.length > 0 && carrito[0]?.detalle_carritos?.length > 0 ? (
            <>
              <button onClick={handlePayButtonClick}>
                Pagar con PayPal
              </button>
              <Link to="/">Volver al Home</Link> 
            </>
          ) : (
            <p>El carrito está vacío</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;
