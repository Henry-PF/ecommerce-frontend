import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import { BsBag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs'
import logo from '../../../assets/logo.png'
import style from './style.module.css'
import Login from './Login/Login'

const NavBar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false)

    const toggleLogin = () => {
        setShow(!show);
    };

    const handleSubmit = () => {
        navigate('/product_list')
    }

    return (
        <>
            <Navbar expand="lg" className={style.nav_container}>
                <Container>
                    <Navbar.Brand className={style.brand} href="/"><img src={logo} className={style.logo} alt="Trendy_Logo" /> Trendy Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
                        <Form className="d-flex w-75" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className={style.input}
                                aria-label="Search"
                            />
                            <Form.Select className={style.select} aria-label="Default select example">
                                <option>Categoria</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Button className={style.btn_search} type='submit'><BsSearch /></Button>
                        </Form>
                        <Nav className="">
                            <Nav.Link className={style.nav_link} ><BsHeart className={style.icon} /></Nav.Link>
                            <Nav.Link className={style.nav_link} ><BsBag className={style.icon} /></Nav.Link>
                            <Nav.Link className={style.nav_link} onClick={() => setShow(!show)}><BsPerson className={style.icon} onClick={() => setShow(!show)} /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Login show={show} toggleLogin={toggleLogin} />
        </>
    )
}

export default NavBar