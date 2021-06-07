import FormHeader from "../componentes/formHeader";
import FormLateral from "../componentes/formLateral";
import FormPrincipal from "../componentes/formPrincipal";
import FormImagen from "../componentes/formImagen";
import React, { useState } from 'react';
import { Button } from 'reactstrap';

export default function CargarDatos() {
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

    function mostrarDatos() {
        console.log(datosHeader);
        console.log(urlImagen);
        console.log(datosLateral);
        console.log(datosPrincipal);
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
            </div>
            <Button onClick={mostrarDatos} color="primary" size="lg">Mostrar datos</Button>
        </div>
    )
}