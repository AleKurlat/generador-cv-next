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

    const lateralVacio = [objLateralVacio];

    const principalVacio = {}

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
        <div className="card2">
            <h2>Cargar datos de CV</h2>
            <FormHeader datosHeader={datosHeader} setDatosHeader={setDatosHeader} />
            <FormImagen urlImagen={urlImagen} setUrlImagen={setUrlImagen} />
            <FormLateral datosLateral={datosLateral} setDatosLateral={setDatosLateral} objLateralVacio={objLateralVacio} />
            <FormPrincipal datosPrincipal={datosPrincipal} setDatosPrincipal={setDatosPrincipal} />
            <Button onClick={mostrarDatos} color="primary" size="lg">Mostrar datos</Button>
        </div>
    )
}