import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Offcanvas } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import style from './style.module.css'
import { Link } from 'react-router-dom'

const Login = (props) => {
    return (
        <>
            <Offcanvas show={props.show} onHide={props.toggleLogin} placement='end' backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>INICIAR SESI&#211;N</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form >
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
                        <Button className={style.btn_login} type='submit' >
                            INICIAR SESIÓN
                        </Button>

                    </Form>
                    <Link className={style.btn_google} to='http://localhost:3002/api/auth/google' type="button">
                        <FcGoogle className={style.google_logo} />
                        Iniciar sesi&#243;n con Google
                    </Link>
                    <div className='d-flex flex-column'>
                        <p>¿Eres nuevo? <a href="#">Registraese!</a></p>
                        <p>Ovidaste tu contraseña? <a href="#">Recuperar Contraseña</a></p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Login