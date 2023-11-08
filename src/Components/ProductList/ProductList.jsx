import  { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './ProducsList.css';
import trendyLogo from '../../assets/Imagen de WhatsApp 2023-11-06 a las 18.58.11_9a79aced.jpg'; // Ajusta la ruta según la ubicación de tu archivo de imagen

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const products = [
    {
      id: 1,
      name: 'Camiseta Roja',
      price: 20.99,
      description: 'Camiseta de algodón de color rojo.',
      image: 'https://www.bolf.es/spa_pl_Camisa-de-manga-larga-para-hombre-rojo-Bolf-5702-36933_4.jpg',
    },
    {
      id: 2,
      name: 'Jeans Azules',
      price: 39.99,
      description: 'Jeans de corte recto en color azul.',
      image: 'https://i.pinimg.com/originals/98/d5/17/98d5173228ee143ebd5b1e696e652f30.jpg',
    },
    {
      id: 3,
      name: 'Camiseta Verde',
      price: 18.99,
      description: 'Camiseta de algodón de color verde.',
      image: 'https://img.elo7.com.br/product/zoom/2B20A4A/camiseta-basica-lisa-verde-bandeira-baby-look-feminina.jpg',
    },
    {
      id: 4,
      name: 'Shorts Negros',
      price: 24.99,
      description: 'Shorts de tela negra para el verano.',
      image: 'url_de_la_imagen_4.jpg',
    },
    {
      id: 5,
      name: 'Vestido Floral',
      price: 29.99,
      description: 'Vestido de flores para ocasiones especiales.',
      image: 'url_de_la_imagen_5.jpg',
    },
    {
      id: 6,
      name: 'Zapatos de Cuero',
      price: 49.99,
      description: 'Zapatos elegantes de cuero negro.',
      image: 'url_de_la_imagen_6.jpg',
    },
    {
      id: 7,
      name: 'Gorra de Béisbol',
      price: 9.99,
      description: 'Gorra de béisbol con diseño clásico.',
      image: 'url_de_la_imagen_7.jpg',
    },
    {
      id: 8,
      name: 'Sudadera con Capucha',
      price: 34.99,
      description: 'Sudadera cómoda con capucha y bolsillos.',
      image: 'url_de_la_imagen_8.jpg',
    },
    // Agregar más productos si es necesario
  ];
  
  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  // Manejar el cambio de página
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };


  return (
    <div className="product-list">
      <div className="app-header">
      <img src={trendyLogo} alt="Trendy Logo" className="logo-img" />
        <h1 className="app-name">Trendy</h1>
      </div>
      <ul>
        {currentProducts.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
              <p>Descripción: {product.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <ReactPaginate
  previousLabel={'Anterior'}
  nextLabel={'Siguiente'}
  pageCount={Math.ceil(products.length / productsPerPage)}
  marginPagesDisplayed={2}
  pageRangeDisplayed={3}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  subContainerClassName={'pages pagination'}
  activeClassName={'active'}
/>

    </div>
  );
};

export default ProductList;
