import React, { useState } from 'react'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import { BsBag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs'
import logo from '../../../assets/logo.png'
import style from './style.module.css'
import Login from './Login/Login'

const NavBar = () => {
    const [show, setShow] = useState(false)

    const toggleLogin = () => {
        setShow(!show);
    };
    return (
        <>
            <Navbar expand="lg" className={style.nav_container}>
                <Container>
                    <Navbar.Brand className={style.brand} href="#home"><img src={logo} className={style.logo} alt="Trendy_Logo" /> Trendy Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse className='justify-content-end' id="basic-navbar-nav">
                        <Form className="d-flex w-75">
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
                            <Button className={style.btn_search}><BsSearch /></Button>
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