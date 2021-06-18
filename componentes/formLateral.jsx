import { Form, FormGroup, Input, Button, Label, UncontrolledTooltip } from 'reactstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';

export default function FormLateral(props) {
    const { datosLateral, setDatosLateral, objLateralVacio } = props;
    let arrayCampos = datosLateral.map((el, i) => {
        return (
            <div key={i} className="parrafo">
                <FormGroup>
                    <Label>
                        <h4>Tipo de dato </h4>
                        <div className="mb-2">Ej: "teléfono", "mail", etc.</div>
                    </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="nombreItem" value={datosLateral[i].nombreItem} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        <h4>Valor del dato</h4>
                        <div className="mb-2">Ej: "123@gmail.com", "0000-0000"</div>
                    </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="valorItem" value={datosLateral[i].valorItem} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                <div className="botonera">
                    <Button color="info" id={"subirCampo" + i} onClick={() => { subirCampo(i) }}><img src="/arrowup.png" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"subirCampo" + i} >Reubicar campo hacia arriba</UncontrolledTooltip>
                    <Button color="info" id={"bajarCampo" + i} onClick={() => { bajarCampo(i) }}><img src="/arrowdown.png" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"bajarCampo" + i} >Reubicar campo hacia abajo</UncontrolledTooltip>
                    <Button color="info" id={"eliminarCampo" + i} onClick={() => { eliminarCampo(i) }}><img src="/eliminar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"eliminarCampo" + i} >Eliminar campo</UncontrolledTooltip>
                </div>
            </div>
        )
    });

    function handler(evento, i) {
        let arrayProvisorio = [...datosLateral];
        arrayProvisorio[i] = { ...arrayProvisorio[i], [evento.target.name]: evento.target.value }
        setDatosLateral(arrayProvisorio);
    };

    function agregarCampo() {
        let arrayProvisorio = [...datosLateral];
        arrayProvisorio.push(objLateralVacio);
        setDatosLateral(arrayProvisorio);
    }

    function subirCampo(viejoOrden) {
        let elementoMovido = [...datosLateral][viejoOrden];
        let arrayProvisorio = [...datosLateral].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = 0;
        if (viejoOrden > 0) { nuevoOrden = viejoOrden - 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosLateral(arrayProvisorio);
    }

    function bajarCampo(viejoOrden) {
        const cantDestacados = datosLateral.length;
        let elementoMovido = [...datosLateral][viejoOrden];
        let arrayProvisorio = [...datosLateral].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = cantDestacados - 1;
        if (viejoOrden < (cantDestacados - 1)) { nuevoOrden = viejoOrden + 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosLateral(arrayProvisorio);
    }

    function eliminarCampo(i) {
        if (datosLateral.length > 1) {
            let arrayProvisorio = [...datosLateral];
            arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
            setDatosLateral(arrayProvisorio);
        } else {
            swal("La barra lateral debe tener al menos un campo de datos");
        }
    }

    return (
        <section>
            <Form>
                {arrayCampos}
                <Button color="primary" onClick={agregarCampo}>Agregar campo de datos</Button>
            </Form>
        </section>
    )
}