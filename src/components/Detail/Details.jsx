import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import NavBar from '../LandingPage/Navbar/NavBar';
import Footer from '../LandingPage/Footer/Footer';
import Newsletter from '../LandingPage/Newsletter/Newsletter';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../redux/actions';
import axios from 'axios';
import { BsCheck2 } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

export default function Details() {
  const { id } = useParams(); // Obtén el ID del producto utilizando useParams

  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/productos/${id}`);
        console.log(data);
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      <div className={styles.divContenido}>
        <div className={styles.container}>

          <div className={styles.divFoto}>
            <img className={styles.imagen} src={product?.img_productos?.[0]?.url} alt="img" />
          </div>
          <div className={styles.divProductoInfo}>
            {product.stock > 0 ? (<span className={styles.inStock}><BsCheck2 /> en Stock</span>) : (<span><RxCross2 /> sin Stock</span>)}
            <h2 className={styles.tituloProducto}>{product.nombre}</h2>
            <p className={styles.price}>$ {product.precio}</p>
            <div className={styles.product_detail}>
              <p className={styles.pProductoInfo}>Categoría</p>
              <p className={styles.pProductoInfo}>{product.categorium?.nombre}</p>
              <p className={styles.pProductoInfo}>Stock</p>
              <p className={styles.pProductoInfo}>{product.stock}</p>
              <p className={styles.pProductoInfo}>Descripción</p>
              <p className={styles.pProductoInfo}>{product.descripcion}</p>
            </div>
          </div>
          <div className={styles.divPanelDeCompra}>
            <div className={styles.divBotoneraCompra}>
              <button className={styles.botonCarrito}>Añadir al Carrito</button>
              <button className={styles.botonFavorito}>Favoritos</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.divDetalles}>
        <div className={styles.infoDetalles}>información precisa del producto</div>
      </div> */}
      <Newsletter />
      <Footer />
    </>
  );
}