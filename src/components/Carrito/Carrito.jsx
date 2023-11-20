import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eliminarDelCarrito, getCarrito, actualizarCarrito } from '../../redux/actions';
import { BsPlusLg, BsDash, BsTrash3 } from "react-icons/bs";
import NavBar from '../LandingPage/Navbar/NavBar'
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './carrito.module.css';

const Carrito = () => {
  const dispatch = useDispatch();
  const userId = parseInt(localStorage.getItem('id'));
  const idCarrito = parseInt(localStorage.getItem('id_carrito'));
  console.log(idCarrito);
  const carrito = useSelector(state => state.carrito);
  const [updateValue, setUpdateValue] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(getCarrito(userId, idCarrito));
    }
  }, [dispatch, userId, idCarrito, updateValue]);

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
      window.open(`https://www.paypal.com/checkoutnow?token=${response.data.order_id}`, '_blank');
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
    }
  };


  const handleAddItem = async (product) => {
    console.log(product);
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    }
    try {
      const { data } = await axios.post('/carrito/addItem', dataCart);
      if (!data.error) {
        setUpdateValue(data)
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveItem = async (product) => {
    console.log(product);
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    }
    try {
      const { data } = await axios.post('/carrito/removeItem', dataCart);
      if (!data.error) {
        setUpdateValue(data)
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (product) => {
    console.log(product);
    const dataCart = {
      id_usuario: localStorage.getItem('id'),
      cantidad: 1,
      subtotal: product?.producto?.precio,
      id_carrito: product?.id_carrito,
      id_producto: product?.producto?.id,
    }
    try {
      const { data } = await axios.post('/carrito/deleteItem', dataCart);
      if (!data.error) {
        setUpdateValue(data)
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <NavBar />
      <h2>Carrito de Compras</h2>
      <div className={styles.container}>
        {carrito.length > 0 && carrito[0]?.detalle_carritos?.length > 0 ? (
          carrito[0]?.detalle_carritos?.map(item => (
            <div key={item.id} className={styles.product_item}>
              <picture className={styles.product_img}>
                <img src={item.producto.img_productos[0].url} alt="" />
              </picture>
              <div className={styles.product_name}>
                <p>{item.producto?.nombre}</p>
              </div>
              <div className={styles.product_input}>
                <button className={styles.btn_product} onClick={() => handleRemoveItem(item)}>{item.cantidad == 1 ? <BsTrash3 className={styles.btn_icon_trash} /> : <BsDash className={styles.btn_icon} />}</button>
                <input
                  className={styles.input}
                  type="text"
                  value={item.cantidad}
                  disabled
                />
                <button className={styles.btn_product} onClick={() => handleAddItem(item)}><BsPlusLg className={styles.btn_icon} /></button>
              </div>
              <p className={styles.product_price}>$ {item.subtotal}</p>
              <button className={styles.btn_delete} onClick={() => handleDelete(item)}><BsTrash3 className={styles.icon_delete} /></button>
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
    </>
  );
};

export default Carrito;
