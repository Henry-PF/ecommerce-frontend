import { useParams } from 'react-router-dom';
import styles from './Details.module.css';
import NavBar from '../LandingPage/Navbar/NavBar';
import Footer from '../LandingPage/Navbar/NavBar';
import Newsletter from '../LandingPage/Navbar/NavBar';
import products from '../productsData';
import PropTypes from 'prop-types';

export default function Details() {
  const { id } = useParams(); // Obtén el ID del producto utilizando useParams

  // Busca el producto correspondiente en la lista de productos
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.divContenido}>
        <div className={styles.divFoto}>
          <img className={styles.imagen} src={product.image} alt="img" />
        </div>
        <div className={styles.divProductoInfo}>
          <h2 className={styles.tituloProducto}>{product.nombre}</h2>
          <hr className={styles.hrProductoInfo} />
          <p className={styles.pProductoInfo}>Precio: {product.precio}</p>
          <p className={styles.pProductoInfo}>Categoría: {product.categoria}</p> {/* Agrega la categoría */}
          <p className={styles.pProductoInfo}>Estado: {product.statud}</p> {/* Agrega el estado (status) */}
          <p className={styles.pProductoInfo}>Descripción: {product.descripcion}</p> {/* Agrega la descripción */}
          <p className={styles.pProductoInfo}>Stock: {product.stock}</p> 
          <hr className={styles.hrProductoInfo} />

        </div>
        <div className={styles.divPanelDeCompra}>
          <div className={styles.divBotoneraCompra}>
            <button className={styles.botonCarrito}>Añadir al Carrito</button>
            <button className={styles.botonFavorito}>Favoritos</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <div className={styles.divDetalles}>
        <div className={styles.infoDetalles}>información precisa del producto</div>
      </div>
      <Footer />
    </main>
  );
}
