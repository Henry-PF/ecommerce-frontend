import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import { BsBag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import logo from '../../../assets/logo.png'
import style from './style.module.css'
import Login from './Login/Login'

const NavBar = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');


    const toggleLogin = () => {
        setShow(!show);
    };

    const handleSubmit = () => {
        const queryParams = `?nombre=${search}&categoria=...`;
        navigate(`/product_list${queryParams}`);
    };

    return (
        <>
            <nav className={style.nav_container}>
                <div className={style.nav_header}>
                    <div className={style.nav_logo}>
                        LOGO
                    </div>
                    <form className={style.nav_search} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder='Buscar...'
                        />
                        <button className={style.btn_search} type='submit'><BsSearch /></button>
                    </form>
                    <div className={style.nav_icons}>
                        <Link className={style.nav_icon} to={''}><BsHeart /></Link>
                        <Link className={style.nav_icon} to={''}><BsBag /></Link>
                        <Link className={style.nav_icon} to={''} onClick={() => setShow(!show)}><BsPerson /></Link>
                        <Link className={`${style.nav_icon} ${style.nav_menu}`} to={''} onClick={() => setOpen(!open)}><AiOutlineMenu /></Link>
                    </div>
                </div>
                <div className={`${style.nav_links} ${open ? style.open : style.close}`}>
                    <a className={style.nav_link} href={'/'}>Home</a>
                    <a className={style.nav_link} href={'/product_list'}>Shop</a>
                    <Link className={style.nav_link} to={''}>Sobre Nosotros</Link>
                    <Link className={style.nav_link} to={''}>Contacto</Link>
                </div>
            </nav>
            <Login show={show} toggleLogin={toggleLogin} />
        </>
    )
}

export default NavBar