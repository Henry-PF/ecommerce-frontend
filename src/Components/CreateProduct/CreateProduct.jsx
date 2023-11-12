import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./CreateProduct.module.css";
import Select from 'react-select';
import { getAllCategories, createProcut} from '../../redux/actions';
import { useDispatch, connect } from 'react-redux';
import Swal from 'sweetalert2';

function CreateProduct({ categories }) {

  const dispatch = useDispatch();

  let dataToMap = [];

  if (categories.length) { dataToMap = [...categories]; };

  const [dataProduct, setdataProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    id_categoria: "",
    id_statud: ""
  });

  const handleChange = (event) => {
    setdataProduct({
      ...dataProduct,
      [event.target.name]: event.target.value
    })
    console.log(dataProduct);
    console.log(categories);
  };

  const onSubmit = () => {

    const dataToSend = {
      nombre: dataProduct.nombre,
      descripcion: dataProduct.descripcion,
      precio: dataProduct.precio,
      stock: dataProduct.stock,
      id_categoria: dataProduct.id_categoria,
      id_statud: dataProduct.id_statud
    };

    dispatch(createProcut(dataToSend));
    Swal.fire(
      'Producto Creado!',
      'El producto fue creado exitosamente.',
      'success'
    ).then(() => setdataProduct({
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 0,
      id_categoria: "",
      id_statud: ""
    }))
  };



  useEffect(() => {
    dispatch(getAllCategories());
  }, [])

  return (
    <main className='container'>
      <div className="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className=''>Create Product</h1>
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
          <Form className={styles.container} onSubmit={() => onSubmit()}>
            <div className={styles.input_container}>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Nombre Del Producto" className="w-100">
                  <Form.Control
                    className={styles.form_input}
                    type="text"
                    placeholder="Nombre Del Producto"
                    name='nombre'
                    value={dataProduct.nombre}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

              </div>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Descripcion" className="w-100">
                  <Form.Control
                    className={styles.form_input}
                    type="text"
                    placeholder="Descripcion"
                    name='descripcion'
                    value={dataProduct.descripcion}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <div className={styles.input_name}>
                <FloatingLabel controlId="floatingPassword" label="Stock Disponible" className="w-50">
                  <Form.Control
                    className={styles.form_input}
                    type="number"
                    placeholder="Stock Disponible"
                    name='stock'
                    value={dataProduct.stock}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Valor del Producto" className="w-50">
                  <Form.Control
                    className={styles.form_input}
                    type="number"
                    placeholder="Valor del Producto"
                    name='precio'
                    value={dataProduct.precio}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </div>
              <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                <Form.Label className='text-black'>Status Del Producto</Form.Label>
                <FloatingLabel controlId="floatingInput" label="Estado" className="w-100" >
                  <Form.Select aria-label="Default select example" value={dataProduct.id_statud} name='id_statud' onChange={event => handleChange(event)}>
                    <option>Selecciones un estado</option>
                    <option value="1">ACTIVO</option>
                    <option value="2">INACTIVO</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className={styles.formGroup} controlId="formBasicEmail">
                <Form.Label className='text-black'>Categoria</Form.Label>
                <Select
                  className={styles.form_input}
                  isClearable
                  name='id_categoria'
                  options={dataToMap?.map(categorie => ({
                    value: categorie.id,
                    label: categorie.nombre
                  }))}
                  placeholder='Categoria'
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setdataProduct({ ...dataProduct, id_categoria: selectedOption.value });
                    } else {
                      setdataProduct({ ...dataProduct, id_categoria: '' });
                    }
                  }}
                  required
                />
              </Form.Group>
              <Button className='w-100 my-4' variant="primary" type="submit">
                Crear Producto
              </Button>
            </div>
          </Form>
        </div >
        {/* /.content-wrapper */}
        < footer className="main-footer" >

        </footer >
        {/* Control Sidebar */}
        < aside className="control-sidebar control-sidebar-dark" >
          {/* Control sidebar content goes here */}
        </aside >
        {/* /.control-sidebar */}
      </div >
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps, null)(CreateProduct);
