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
        router.push("/");
    }

    return (
        <div className="pagForm">
            <div className="contenedor">
                <div className="alerta">
                    <strong>
                        <p>   Aclaración importante: en la versión actual este sitio NO conserva los datos ingresados, por lo cual se recomienda escribir el CV en un archivo de texto aparte y aquí solamente copiarlos. Si se refresca la ventana o se cierra, los datos se perderán.</p>
                    </strong>
                    <p>Una vez que se hace click en "generar CV", se pasa a otra pantalla donde se muestran los datos ingresados ya listos para imprimir (haciendo click en la opción "imprimir" del navegador). Para volver atrás y editar los datos, clickear en el botón "retroceder" del navegador.</p>

                    App web programada en React / Next.JS, junio 2021.
                    <a href="https://github.com/AleKurlat" style={{ "text-decoration": "none" }}>https://github.com/AleKurlat</a>
                </div>
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