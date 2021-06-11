import FormHeader from "../componentes/formHeader";
import FormLateral from "../componentes/formLateral";
import FormPrincipal from "../componentes/formPrincipal";
import FormImagen from "../componentes/formImagen";
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import axios from "axios";
import { preLoader, responderError, hostAPI } from "../librerias/lib.jsx";

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

    function generarCV() {
        console.log(datosHeader);
        console.log(datosPrincipal);
        console.log(datosLateral);
        console.log(urlImagen);
        //router.push("/");
    }

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
                <Button onClick={generarCV} color="info" size="lg">Guardar datos y generar CV</Button>
                <div className="alerta">
                    App web programada en React / Next.JS
                    <a href="https://github.com/AleKurlat" style={{ "textDecoration": "none" }}>https://github.com/AleKurlat</a>
                </div>
            </div>
        </div>
    )
}