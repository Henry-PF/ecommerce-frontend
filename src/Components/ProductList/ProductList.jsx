import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import trendyLogo from '../../assets/Imagen de WhatsApp 2023-11-06 a las 18.58.11_9a79aced.jpg'; // Ajusta la ruta según la ubicación de tu archivo de imagen
import NavBar from '../LandingPage/Navbar/NavBar';
import Newsletter from '../LandingPage/Newsletter/Newsletter';
import Footer from '../LandingPage/Footer/Footer';
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import './ProducsList.css';
import { buscarProductos, getAllCategories, getAllProducts } from '../../redux/actions';
import { Accordion } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const offset = currentPage * productsPerPage;
  const currentProducts = products?.slice(offset, offset + productsPerPage);

  // Manejar el cambio de página
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtroNombre = params.get('nombre');
    const categoria = params.get('categoria');
    console.log('producto', filtroNombre);

    dispatch(buscarProductos({
      nombre: filtroNombre,
      categoria: categoria,
    }));

    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch, location.search]);

  return (
    <>
      <NavBar />
      <div className="product-list">

        <aside className='menu_search'>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categorias</Accordion.Header>
              <Accordion.Body className='accordion_body'>
                <div>
                  <input type="checkbox" name="" id="hombre" className='category_input' />
                  <label htmlFor="hombre">Hombre</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="mujer" className='category_input' />
                  <label htmlFor="mujer">Mujer</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="niños" className='category_input' />
                  <label htmlFor="niños">Niños</label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Precio</Accordion.Header>
              <Accordion.Body className='accordion_price'>
                <input type="number" placeholder='Minimo' className='' min={0} /> - <input type="number" placeholder='Maximo' className='' min={0} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </aside>

        <ul>
          {currentProducts?.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <h4 className='product-price'>$ {product.price}</h4>
                <p className='product-orders'>
                  <span className='product-stock'>{`${product.stock} en Stock`}</span>
                  <VscDebugBreakpointLog className='icon-diamont' />
                  <span className='product-shipping'>Envio Gratis</span>
                </p>
                <p className='product-description'>Descripción: {product.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div>

          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            pageCount={Math.ceil(products?.length / productsPerPage)}
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
