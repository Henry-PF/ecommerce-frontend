import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsBag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import Cookies from 'js-cookie';
import style from './style.module.css'
import Login from './Login/Login'
import { userLoginSuccess } from '../../../redux/actions'
import BtnLoggedIn from './BtnLoggedIn/BtnLoggedIn'

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null)

    const toggleLogin = () => {
        setShow(!show);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const queryParams = search ? `?nombre=${encodeURIComponent(search)}&categoriaId=` : '';
        const url = `/product_list/${queryParams}`;
        navigate(url);
        setSearch(search);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        const userData = Cookies.get('user');

        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            console.log(parsedUser);
            localStorage.setItem('token', token);
            localStorage.setItem('id', parsedUser.id);
            localStorage.setItem('nombre', parsedUser.usuario);
        }

        const params = new URLSearchParams(location.search);
        setSearch(params.get('nombre') || search);
    }, []);


    console.log(user);
    return (
        <><div className='container'>

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

                        {
                            localStorage.getItem('token')
                                ? <BtnLoggedIn name={localStorage.getItem('nombre')} />
                                : <Link className={style.nav_icon} to={''} onClick={() => setShow(!show)}><BsPerson /></Link>
                        }

                        <Link
                            className={`${style.nav_icon} ${style.nav_menu}`} to={''}
                            onClick={() => setOpen(!open)}
                        >
                            <AiOutlineMenu />
                        </Link>

                    </div>
                </div>
                <div className={`${style.nav_links} ${open ? style.open : style.close}`}>
                    <a className={style.nav_link} href={'/'}>Home</a>
                    <a className={style.nav_link} href={'/product_list'}>Shop</a>
                    <Link className={style.nav_link} to={'/about_us'}>Sobre Nosotros</Link>
                    <Link className={style.nav_link} to={''}>Contacto</Link>
                    <Link className={style.nav_link} to={'/CreateProducts'}>Crear Producto</Link>
                </div>
            </nav>
            <Login show={show} toggleLogin={toggleLogin} />
        </div>
        </>
    )
}

export default NavBar