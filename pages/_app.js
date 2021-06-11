//import '../styles/globals.css'
import '../styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

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

  return <Component {...pageProps} {...pasarProps} />
}

export default MyApp
