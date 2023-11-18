import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Offcanvas } from 'react-bootstrap'
import { BsBagPlus } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import style from './style.module.css'
import { deleteFavorite, getFavorites } from '../../../redux/actions';
import Swal from 'sweetalert2';

const Favorites = (props) => {

    const [datos, setDatos] = useState()

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    // const [favorites, setFavorites] = useState(null);

    const handleDelete = async (id) => {
        const datos = {
            userId: parseInt(localStorage.getItem('id')),
            productId: id
        };
        try {
            const { data } = await axios.post('/favoritos/delete', datos);
            if (!data.error) {
                Swal.fire({
                    title: data.message,
                    icon: 'success'
                })
                setDatos(data)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        dispatch(getFavorites(localStorage.getItem('id')))
    }, [dispatch, props, Swal, datos]);

    return (
        <>
            <Offcanvas show={props.show} onHide={props.toggleFavorites} placement='end' backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Mi Lista de Favoritos</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        favorites?.map(fav => (
                            <div key={fav.id} className={style.card_container}>
                                <img className={style.img_product} src={fav.producto.img_productos[0].url} alt="" />

                                <div className={style.card_info}>
                                    <div>
                                        <p>{fav.producto.nombre}</p>
                                        <p>$ {fav.producto.precio}</p>
                                    </div>
                                    <div className={style.btn_container}>
                                        <button className={style.btn} onClick={() => handleDelete(fav.producto.id)}><RxCross2 /></button>
                                        <button className={style.btn}><BsBagPlus /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Favorites