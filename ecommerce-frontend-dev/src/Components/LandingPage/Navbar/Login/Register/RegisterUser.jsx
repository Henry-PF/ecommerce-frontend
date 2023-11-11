import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import "./style.css"
const RegisterUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de registro, por ejemplo, enviar datos al servidor
    };

    return (
        <div>
            <h2>REGISTRARSE</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Nombre"
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Contraseña"
                />

                <button type="submit">REGISTRARSE</button>
            </form>

            <div className="button-container">
                <button to="http://localhost:3001/auth/google">
                    <FcGoogle />
                    Registrarse con Google
                </button>
            </div>
            <div className='d-flex flex-column link-container'>
                <p>¿Ya tienes una cuenta? <Link to="/">Iniciar Sesión</Link></p>
            </div>
        </div>
    );
};

export default RegisterUser;