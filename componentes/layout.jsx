import { preLoader, responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

export default function Layout(props) {
    const { token, setToken } = props;
    let barraUsuario;

    function desloguear() {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", "");
        }
        setToken();
    }

    if (token) {
        barraUsuario =
            <div className="barraUsuario">
                <div><strong>Ingresaste a la aplicación con el email "{obtenerDatosToken(token).email}"</strong></div>
                <Button className="boton" color="primary" onClick={desloguear}>Cerrar sesión</Button>
            </div>
    }

    return (
        <div>
            <div><h1 className="text-center mb-3">Armá tu CV online</h1></div>
            <div>{barraUsuario}</div>
            {props.children}
            <div className="alerta">
                App web programada en React / Next.JS
                <a href="https://github.com/AleKurlat" style={{ "textDecoration": "none" }}>https://github.com/AleKurlat</a>
            </div>
        </div>
    )
}