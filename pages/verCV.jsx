import Head from 'next/head';
import Header from "../componentes/verCV/header";
import Lateral from "../componentes/verCV/lateral";
import Principal from "../componentes/verCV/principal";
import axios from "axios";
import { preLoader, responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";
import React, { useState, useEffect } from 'react';
import Layout from '../componentes/layout.jsx';
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import Link from 'next/link';

export default function VerCV(props) {
  const router = useRouter();
  const { token, loading } = props;
  const autorizacion = { headers: { Authorization: token } };
  const [datosCV, setDatosCV] = useState();
  const [statePreLoader, preLoaderOn] = useState(false);

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

  useEffect(async () => {
    if (token) {
      preLoaderOn(true);
      await traerCV();
      preLoaderOn(false);
    }
  }, [token]);

  let zonaPreLoader;
  if (statePreLoader) { zonaPreLoader = preLoader };

  if (!loading) {
    if (token) {
      if (datosCV) {
        const { datosHeader, datosLateral, datosPrincipal, urlImagen } = datosCV;
        return (
          <div className="contenedor verCV">
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
            <div className="barraGuardar">
              <Link href="/" passHref><Button className="mx-4" color="primary" size="lg">Volver a editar</Button></Link>
              <Link href="/instrucciones" passHref><Button className="mx-4" color="primary" size="lg">Instructivo para guardar como PDF</Button></Link>
            </div>
          </div>
        )
      } else {
        return (
          <Layout {...props}>
            {zonaPreLoader}
            <div className="pagForm">
              <div className="contenedor">
                Esperando respuesta del servidor...
              </div>
            </div>
          </Layout>);
      }
    } else {
      router.push("/login");
      return (
        <Layout {...props}>
          {zonaPreLoader}
          <div className="pagForm">
            <div className="contenedor">
              Redireccionando al login...
            </div>
          </div>
        </Layout>
      )
    }
  } {
    return (
      <Layout {...props}>
        {zonaPreLoader}
        <div className="pagForm">
          <div className="contenedor">
            Esperando datos del usuario...
          </div>
        </div>
      </Layout>);
  }

}
