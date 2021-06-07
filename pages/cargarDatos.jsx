import FormHeader from "../componentes/formHeader";
import FormLateral from "../componentes/formLateral";
import FormPrincipal from "../componentes/formPrincipal";
import FormImagen from "../componentes/formImagen";
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router'

export default function CargarDatos(props) {
    const router = useRouter();
    const { datosHeader, setDatosHeader, urlImagen, setUrlImagen, datosLateral, setDatosLateral, datosPrincipal, setDatosPrincipal, objPrincipalVacio, objLateralVacio, itemPrincipalVacio } = props;

    function generarCV() {
        console.log(datosHeader);
        console.log(urlImagen);
        console.log(datosLateral);
        console.log(datosPrincipal);
        router.push("/");
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
                <Button onClick={generarCV} color="info" size="lg">Generar CV</Button>
            </div>
        </div>
    )
}