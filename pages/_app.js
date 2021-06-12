//import '../styles/globals.css'
import '../styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const pasarProps = { token, setToken, loading }

  function chequearToken() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      setLoading(false);
    }
  }

  useEffect(chequearToken, []);

  return (
    <>
      <Head>
        <title>Creá tu CV</title>
        <meta name="description" content="App para generar tu Curriculum Vitae online" />
        <meta property="og:site_name" content="Creá tu CV" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Creá tu CV" />
        <meta property="og:description" content="App para generar tu Curriculum Vitae online" />
        <meta property="og:image" content="https://image.flaticon.com/icons/png/512/760/760780.png" />
        <meta name="twitter:image" content="https://image.flaticon.com/icons/png/512/760/760780.png" />
        <meta name="twitter:title" content="Creá tu CV" />
        <meta name="twitter:description" content="App para generar tu Curriculum Vitae online" />
      </Head>
      <Component {...pageProps} {...pasarProps} />
    </>
  )
}

export default MyApp
