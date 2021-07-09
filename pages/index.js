import FormHeader from "../componentes/editarCV/header/formHeader";
import FormLateral from "../componentes/editarCV/lateral/formLateral";
import FormPrincipal from "../componentes/editarCV/principal/formPrincipal";
import FormImagen from "../componentes/editarCV/lateral/formImagen";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import axios from "axios";
import { preLoader, responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";
import Layout from '../componentes/layout.jsx';

export default function Home(props) {
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
    const [statePreLoader, preLoaderOn] = useState(false);
    const [CVCargado, setCVCargado] = useState(false);
    const { token, loading } = props;
    const autorizacion = { headers: { Authorization: token } };
    const savedCallback = useRef();
    const intervalo = useRef();

    async function traerCV() {
        try {
            const datosToken = obtenerDatosToken(token);
            const id = datosToken.user_id;
            const urlAPI = hostAPI + "/cvs/" + id;
            const loguear = await axios.get(urlAPI, autorizacion);
            if (loguear && loguear.status === 200) {
                if (loguear.data) {
                    if (loguear.data.datosHeader) { setDatosHeader(loguear.data.datosHeader) }
                    if (loguear.data.datosLateral) { setDatosLateral(loguear.data.datosLateral) }
                    if (loguear.data.datosPrincipal) { setDatosPrincipal(loguear.data.datosPrincipal) }
                    if (loguear.data.urlImagen) { setUrlImagen(loguear.data.urlImagen); }
                    setCVCargado(true);
                }
            }
        }
        catch (e) { return responderError(e) }
    }

    async function guardarCV() {
        try {
            if (token && CVCargado) {
                const datosToken = obtenerDatosToken(token);
                const id = datosToken.user_id;
                const urlAPI = hostAPI + "/cvs/" + id;
                const objeto = { "cv": { datosHeader, urlImagen, datosLateral, datosPrincipal } }
                await axios.put(urlAPI, objeto, autorizacion);
                console.log("Los datos ingresados fueron guardados");
                console.log(datosPrincipal.length);
            } else { console.log("No guardado"); console.log(datosPrincipal) }
        }
        catch (e) {
            return responderError(e)
        }
    }

    async function iniciarPagina() {
        preLoaderOn(true);
        await traerCV();
        preLoaderOn(false);
        intervalo.current = setInterval(() => { savedCallback.current() }, 10000);
    }

    useEffect(() => { savedCallback.current = guardarCV }, [guardarCV]);

    useEffect(() => {
        if (token) {
            iniciarPagina();
            return () => {
                clearInterval(intervalo.current);
                console.log("Componente desmontado");
            }
        }
    }, [token]);

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    if (loading === false) {
        if (token) {
            if (CVCargado) {
                return (
                    <div className="editarCV">
                        <Layout {...props}>
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
                                </div>
                            </div>
                        </Layout>
                        <div className="barraGuardar">
                            {zonaPreLoader}
                            <Button onClick={async () => { preLoaderOn(true); await guardarCV(); preLoaderOn(false); router.push("/verCV"); }} color="primary" size="lg">Generar CV</Button>
                            <div>Los datos ingresados se guardan automáticamente cada 20 segundos</div>
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
                    </Layout>
                )
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
            );
        }
    } else {
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