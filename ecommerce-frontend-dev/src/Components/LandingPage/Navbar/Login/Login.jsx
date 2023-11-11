import { Button, FloatingLabel, Form, Offcanvas } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import style from './style.module.css';
import PropTypes from 'prop-types';

const Login = (props) => {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.toggleLogin} placement='end' backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>INICIAR SESIÓN</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-2">
                            <Form.Control
                                className={style.input}
                                type="email"
                                placeholder="Email"
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Contraseña" className="mb-2">
                            <Form.Control
                                className={style.input}
                                type="password"
                                placeholder="Contraseña"
                            />
                        </FloatingLabel>
                        <Button className={style.btn_login} type='submit'>
                            INICIAR SESIÓN
                        </Button>
                    </Form>
                    <Button className={style.btn_google} to='http://localhost:3001/auth/google' type="button">
                        <FcGoogle className={style.google_logo} />
                        Iniciar sesión con Google
                    </Button>
                    <div className='d-flex flex-column'>
                        <p>¿Eres nuevo? <a href="/register">Registrarse!</a></p>
                        <p>¿Olvidaste tu contraseña? <a href="#">Recuperar Contraseña</a></p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

Login.propTypes = {
    show: PropTypes.bool.isRequired,
    toggleLogin: PropTypes.func.isRequired,
    toggleRegister: PropTypes.func.isRequired,
};

export default Login;
