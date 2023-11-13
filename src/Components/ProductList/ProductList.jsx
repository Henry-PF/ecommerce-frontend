import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import NavBar from '../LandingPage/Navbar/NavBar';
import Newsletter from '../LandingPage/Newsletter/Newsletter';
import Footer from '../LandingPage/Footer/Footer';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import './ProducsList.css';
import { buscarProductos, getAllCategories, getAllProducts } from '../../redux/actions';
import { Accordion } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [precioMax, setPrecioMax] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.id;

    if (selectedCategories.includes(checkboxValue)) {
      setSelectedCategories(selectedCategories.filter(category => category !== checkboxValue));
    } else {
      setSelectedCategories([...selectedCategories, checkboxValue]);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtroNombre = params.get('nombre');
    const categoria = params.get('categoria');
    setSearchActive(Boolean(filtroNombre || categoria || selectedCategories.length > 0));
    dispatch(getAllCategories());

    if (filtroNombre || categoria || selectedCategories.length > 0) {
      dispatch(
        buscarProductos({
          nombre: filtroNombre,
          categoria: categoria || selectedCategories.join(','),
          precioMin: precioMin,
          precioMax: precioMax,
          page: currentPage
        })
      );
    } else {
      dispatch(getAllProducts(currentPage));
    }
  }, [dispatch, location.search, selectedCategories, precioMax, precioMin, currentPage]);

  return (
    <>
      <NavBar />
      <div className="product-list">
        <aside className='menu_search'>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categorias</Accordion.Header>
              <Accordion.Body className='accordion_body'>
                {
                  categories?.map(category => (
                    <div>
                      <input
                        type="checkbox"
                        name={category.nombre}
                        id={category.id}
                        className='category_input'
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={category.id}>{category.nombre}</label>
                    </div>
                  ))
                }
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Precio</Accordion.Header>
              <Accordion.Body className='accordion_price'>
                <input type="number" placeholder='Minimo' className='' min={0} onChange={(event) => setPrecioMin(event.target.value)} /> - <input type="number" placeholder='Maximo' className='' min={0} onChange={(event) => setPrecioMax(event.target.value)} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </aside>

        {(searchActive || (products.data && products.data.length > 0)) && (
          <ul>
            {products.data?.map((product) => (
              <div className="product-item">
                <a key={product.id} href={`/product_detail/${product.id}`} className='product-card'>
                  <img src={product.img_productos[0]?.url} alt={product.nombre} />
                  <div className="product-info">
                    <h3>{product.nombre}</h3>
                    <p className='product_category'>{product.categorium?.nombre}</p>
                    <h4 className='product-price'>$ {product.precio}</h4>
                    <p className='product-orders'>
                      <span className='product-stock'>{`${product.stock} en Stock`}</span>
                      <VscDebugBreakpointLog className='icon-diamont' />
                      <span className='product-shipping'>Envio Gratis</span>
                    </p>
                    <p className='product-description'>{product.descripcion}</p>
                  </div>
                </a>
                <button type='button' className='btn_fav'><BsHeart /></button>
              </div>
            ))}
          </ul>
        )}
      </div>
      {/* <div className="pagination-buttons">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <AiOutlineArrowLeft />
        </button>
        <span> {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={products.length < 10}>
          <AiOutlineArrowRight />
        </button>
      </div> */}
      <ReactPaginate
        previousLabel={<AiOutlineArrowLeft className='pagination-icon' />}
        nextLabel={<AiOutlineArrowRight className='pagination-icon' />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={products?.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(selected) => handlePageChange(selected.selected + 1)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductList;
