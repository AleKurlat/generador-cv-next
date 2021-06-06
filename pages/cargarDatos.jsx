import FormHeader from "../componentes/formHeader";
import FormLateral from "../componentes/formLateral";
import FormPrincipal from "../componentes/formPrincipal";
import FormImagen from "../componentes/formImagen";
import React, { useState } from 'react';

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

    return (
        <div className="card2">
            <h2>Cargar datos de CV</h2>
            <FormHeader datosHeader={datosHeader} setDatosHeader={setDatosHeader} />
            <FormImagen urlImagen={urlImagen} setUrlImagen={setUrlImagen} />
            <FormLateral datosLateral={datosLateral} setDatosLateral={setDatosLateral} objLateralVacio={objLateralVacio} />
            <FormPrincipal datosPrincipal={datosPrincipal} setDatosPrincipal={setDatosPrincipal} />
        </div>
    )
}