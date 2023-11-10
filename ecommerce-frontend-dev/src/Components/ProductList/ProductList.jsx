import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link
import ReactPaginate from 'react-paginate';
import './ProducsList.css';
import NavBar from '../LandingPage/Navbar/NavBar';
import Footer from '../LandingPage/Navbar/NavBar';
import Newsletter from '../LandingPage/Navbar/NavBar';
import products from '../productsData';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  // Manejar el cambio de página
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

 
  return (
    <>
      <NavBar />
      <div className="product-list">
        <ul>
          {currentProducts.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Precio: ${product.price}</p>
                <p>Descripción: {product.description}</p>
                {/* Agrega el botón de enlace a la página de detalles */}
                <Link to={`/product_detail/${product.id}`}>
                  <button>Ver detalles</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div>
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
      </div>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductList;