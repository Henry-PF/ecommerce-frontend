import React, { useEffect, useRef, useState } from "react";
import NavBar from "../LandingPage/Navbar/NavBar";
import styles from "./Unsubscribe.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../LandingPage/Footer/Footer";
import { MoonLoader } from "react-spinners";

const Unsubscribe = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const params = useParams();

  const flag = useRef(true);

  async function unsubscribe() {
    const { id } = params;
    try {
      if (title || message) {
        console.log("Ya habia");
        return;
      }

      const result = await axios.post("/emailSubs/unsubscribe", { id });
      setTitle(result?.data?.message);
      setMessage("¡Muchas gracias por elegir Trendy!");
    } catch (error) {
      const result = error.response?.data;
      setTitle(result?.message);
      if (error?.response?.status === 404) {
        setMessage("¡Gracias por visitar Trendy!");
      } else {
        setMessage("Se produjo un error");
      }
    }
  }

  useEffect(() => {
    if (flag.current) {
      unsubscribe();
      flag.current = false;
    }
  }, []);

  return (
    <>
      <NavBar />
      {flag.current ? (
        <div style={{ background: "none" }} className={styles.container}>
          <MoonLoader />
        </div>
      ) : (
        <div className={styles.container}>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Unsubscribe;
