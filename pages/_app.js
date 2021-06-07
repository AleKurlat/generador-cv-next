//import '../styles/globals.css'
import '../styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const headerVacio = {
    nombre: "",
    descripcion: ""
  }

  const objLateralVacio =
  {
    nombreItem: "",
    valorItem: ""
  }

  const itemPrincipalVacio = {
    encabezadoP: "",
    parrafo: ""
  }

  const objPrincipalVacio = {
    titulo: "",
    subtitulo: "",
    items: [itemPrincipalVacio]
  }

  const lateralVacio = [objLateralVacio];
  const principalVacio = [objPrincipalVacio];

  const [datosHeader, setDatosHeader] = useState(headerVacio);
  const [urlImagen, setUrlImagen] = useState("");
  const [datosLateral, setDatosLateral] = useState(lateralVacio);
  const [datosPrincipal, setDatosPrincipal] = useState(principalVacio);

  const pasarProps = { datosHeader, setDatosHeader, urlImagen, setUrlImagen, datosLateral, setDatosLateral, datosPrincipal, setDatosPrincipal, lateralVacio, principalVacio, objPrincipalVacio, objLateralVacio, itemPrincipalVacio }

  return <Component {...pageProps} {...pasarProps} />
}

export default MyApp
