import Head from 'next/head';
import Header from "../componentes/header";
import Lateral from "../componentes/lateral";
import Principal from "../componentes/principal";
import axios from "axios";
import { preLoader, responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";
import React, { useState, useEffect } from 'react';

export default function Home(props) {
  //const { datosHeader, urlImagen, datosLateral, datosPrincipal } = props;
  const { token } = props;
  const autorizacion = { headers: { Authorization: token } };
  const [datosCV, setDatosCV] = useState();

  async function traerCV() {
    try {
      const datosToken = obtenerDatosToken(token);
      const id = datosToken.user_id;
      const urlAPI = hostAPI + "/cvs/" + id;
      const loguear = await axios.get(urlAPI, autorizacion);
      if (loguear && loguear.status === 200) {
        setDatosCV(loguear.data);
      }
    }
    catch (e) {
      return responderError(e)
    }
  }

  useEffect(() => {
    if (token) { traerCV() }
  }, [token]);

  if (datosCV) {
    return (
      <div className="contenedor">
        <Head>
          <title>Creá tu CV</title>
          <meta name="description" content="App para generar tu Curriculum Vitae" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header datosHeader={datosHeader} />
        <div className="cuerpo">
          <Lateral datosLateral={datosLateral} urlImagen={urlImagen} />
          <Principal datosPrincipal={datosPrincipal} />
        </div>
      </div>
    )
  } else {
    return ("esperando datos")
  }

}
