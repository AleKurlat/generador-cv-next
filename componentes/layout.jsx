import { preLoader, responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";
import React, { useState, useEffect } from 'react';

export default function Layout(props) {
    const { token } = props;
    let barraUsuario;

    if (token) {
        barraUsuario =
            <div className="barraUsuario">Ingresaste a la aplicación con el usuario "{obtenerDatosToken(token).email}"</div>
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