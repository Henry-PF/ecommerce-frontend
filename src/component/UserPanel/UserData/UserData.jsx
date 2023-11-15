import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './style.module.css'

const UserData = () => {
    const [userData, setuserData] = useState({});

    useEffect(() => {
        const userfetch = async () => {
            const { data } = await axios.get(`/usuarios/${localStorage.getItem('id')}`)
            setuserData(data.data)
        }
        userfetch();
    }, [])
    return (
        <>
            <div className={style.user}>
                <h3>{userData.usuario}</h3>
                <h3>{userData.persona?.correo}</h3>
            </div>
        </>
    )
}

export default UserData