import { useState } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { BsBag, BsHeart, BsPerson, BsSearch } from 'react-icons/bs';
import logo from '../../../assets/logo.png';
import style from './style.module.css';
import Login from './Login/Login';
import RegisterUser from './Login/Register/RegisterUser';  

const NavBar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const toggleLogin = () => setShowLogin(!showLogin);
    const toggleRegister = () => setShowRegister(!showRegister);

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
                            <Nav.Link className={style.nav_link} onClick={toggleRegister}>Registrarse</Nav.Link>
                            <Nav.Link className={style.nav_link} ><BsHeart className={style.icon} /></Nav.Link>
                            <Nav.Link className={style.nav_link} ><BsBag className={style.icon} /></Nav.Link>
                            <Nav.Link className={style.nav_link} onClick={()=>setShowLogin(!showLogin)}><BsPerson className={style.icon} /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login show={showLogin} toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
        </>
    );
};

export default NavBar;
