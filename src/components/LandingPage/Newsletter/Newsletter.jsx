import React, { useState } from "react";
import style from "./style.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Ingresá un email válido");
      return;
    }
    let result;
    try {
      const response = await axios.post("/emailSubs/subscribe_news", { email });
      result = response;
    } catch (error) {
      result = error?.response;
    }

    if (result) {
      console.log(result);
      Swal.fire({
        title: result?.data?.message,
        icon:
          result?.status === 200
            ? "success"
            : result?.status === 409
            ? "info"
            : "error",
      });

      if (result?.status === 200) {
        setEmail("");
      }
    }
  }
  return (
    <>
      <div className={style.container}>
        <h3 className={style.h3}>Suscríbete a nuestro boletín de noticias</h3>
        <p className={style.p}>
          Recibe noticias diarias sobre próximas ofertas y promociones de
          nuestros productos.
        </p>
        <form onSubmit={(e) => submitHandler(e)} className={style.form}>
          <div>
            <input
              className={style.input}
              type="email"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              placeholder="Correo"
            />
            <button className={style.btn_submit} type="submit">
              Subscribirse
            </button>
          </div>
          {error && <p className={style.inputError}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Newsletter;
