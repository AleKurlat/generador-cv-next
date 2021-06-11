import FormHeader from "../componentes/formHeader";
import FormLateral from "../componentes/formLateral";
import FormPrincipal from "../componentes/formPrincipal";
import FormImagen from "../componentes/formImagen";
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import axios from "axios";
import { preLoader, responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";

export default function CargarDatos(props) {
    const router = useRouter();
    const headerVacio = { nombre: "", descripcion: "" };
    const objLateralVacio = { nombreItem: "", valorItem: "" };
    const itemPrincipalVacio = { encabezadoP: "", parrafo: "" };
    const objPrincipalVacio = { titulo: "", subtitulo: "", items: [itemPrincipalVacio] };
    const lateralVacio = [objLateralVacio];
    const principalVacio = [objPrincipalVacio];
    const [datosHeader, setDatosHeader] = useState(headerVacio);
    const [urlImagen, setUrlImagen] = useState("");
    const [datosLateral, setDatosLateral] = useState(lateralVacio);
    const [datosPrincipal, setDatosPrincipal] = useState(principalVacio);
    const { token } = props;
    const autorizacion = { headers: { Authorization: token } };

    async function traerCV() {
        try {
            const datosToken = obtenerDatosToken(token);
            const id = datosToken.user_id;
            const urlAPI = hostAPI + "/cvs/" + id;
            const loguear = await axios.get(urlAPI, autorizacion);
            if (loguear && loguear.status === 200) {
                setDatosHeader(loguear.data.datosHeader);
                setDatosLateral(loguear.data.datosLateral);
                setDatosPrincipal(loguear.data.datosPrincipal);
                setUrlImagen(loguear.data.urlImagen);
            }
        }
        catch (e) {
            return responderError(e)
        }
    }

    async function guardarCV() {
        try {
            const datosToken = obtenerDatosToken(token);
            const id = datosToken.user_id;
            const urlAPI = hostAPI + "/cvs/" + id;
            const objeto = { "cv": { datosHeader, urlImagen, datosLateral, datosPrincipal } }
            const loguear = await axios.put(urlAPI, objeto, autorizacion);
            if (loguear && loguear.status === 200) {
                router.push("/");
            }
        }
        catch (e) {
            return responderError(e)
        }
    }

    useEffect(() => {
        if (token) { traerCV() }
    }, [token]);


    return (
        <div className="pagForm">
            <div className="contenedor">

                <FormHeader datosHeader={datosHeader} setDatosHeader={setDatosHeader} />
                <div className="cuerpo">
                    <div className="barra-lateral">
                        <FormImagen urlImagen={urlImagen} setUrlImagen={setUrlImagen} />
                        <FormLateral datosLateral={datosLateral} setDatosLateral={setDatosLateral} objLateralVacio={objLateralVacio} />
                    </div>
                    <FormPrincipal datosPrincipal={datosPrincipal} setDatosPrincipal={setDatosPrincipal} objPrincipalVacio={objPrincipalVacio} itemPrincipalVacio={itemPrincipalVacio} />
                </div>
                <Button onClick={guardarCV} color="info" size="lg">Guardar datos y generar CV</Button>
                <div className="alerta">
                    App web programada en React / Next.JS
                    <a href="https://github.com/AleKurlat" style={{ "textDecoration": "none" }}>https://github.com/AleKurlat</a>
                </div>
            </div>
        </div>
    )
}