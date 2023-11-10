import React from 'react'
import styles from "./Details.module.css";



export default function Details() {


    const [dataMokeada, setDataMokeada] = React.useState([
        {
            nombre: "Remera adidas B Club 3 Tiras",
            imagen: "https://www.stockcenter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwa71a2b20/products/AD_GK8179/AD_GK8179-1.JPG"

        }])


    return (
        <main className={styles.main}>
            <div className={styles.divContenido}>
                <div className={styles.divFoto}>
                    <img className={styles.imagen} src={dataMokeada[0].imagen} alt="img" />
                </div>
                <div className={styles.divProductoInfo}>
                    <h2 className={styles.tituloProducto}>{dataMokeada[0].nombre}</h2>
                    <hr className={styles.hrProductoInfo} />
                    <p className={styles.pProductoInfo}>Precio:</p>
                    <hr className={styles.hrProductoInfo} />
                    <p className={styles.pProductoInfo}>Tipo: </p>
                    <p className={styles.pProductoInfo}>Material: </p>
                    <p className={styles.pProductoInfo}>Diseño: </p>
                    <hr className={styles.hrProductoInfo} />
                </div>
                <div className={styles.divPanelDeCompra}>
                    <div className={styles.divBotoneraCompra}>
                        <button className={styles.botonCarrito}>Añadir al Carrito</button>
                        <button className={styles.botonFavorito}>Favoritos</button>
                    </div>
                </div>
            </div>
            <div className={styles.divDetalles}>
                <div className={styles.infoDetalles}>
                    informacion precisa del producto
                </div>
            </div>
        </main>
    )
}
