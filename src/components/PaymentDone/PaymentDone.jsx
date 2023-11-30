import React, { useEffect, useState } from 'react'
import NavBar from '../LandingPage/Navbar/NavBar'
import Footer from '../LandingPage/Footer/Footer'
import styles from './style.module.css'
import { useParams } from 'react-router'
import axios from 'axios'

const PaymentDone = () => {

    const { id } = useParams();
    const [factura, setFactura] = useState({})

    useEffect(() => {
        const fetchFactura = async () => {
            try {
                const { data } = await axios.get(`/facturas/${id}`)
                setFactura(data?.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchFactura()
    }, [])


    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <h1>¡GRACIAS POR TU COMPRA!</h1>
                <h3>Tu compra por  <span className={styles.total}>$ {factura?.total}</span> se realizo con exito</h3>
            </div>
            <Footer />
        </>
    )
}

export default PaymentDone