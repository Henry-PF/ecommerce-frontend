import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CreateOrder = ({ id_user }) => {
  const [orderId, setOrderId] = useState(null);

  const handleCreateOrder = async () => {
    try {
      // Obtener el id_user del localStorage
      const storedId = localStorage.getItem('id');
      console.log(storedId);

      if (!storedId) {
        console.error('Token no encontrado. Usuario no autenticado.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${storedId}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post('/pago/create-order', { id_user }, { headers });

      const { order_id } = response.data;

      setOrderId(order_id);

      window.location.href = `https://www.paypal.com/checkoutnow?token=${order_id}`;
    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  return (
    <div>
      <h2>Crear Orden</h2>
      <button onClick={handleCreateOrder}>Crear Orden</button>
      {orderId && <p>ID de la Orden: {orderId}</p>}
    </div>
  );
};

CreateOrder.propTypes = {
  id_user: PropTypes.string.isRequired,
};

export default CreateOrder;
