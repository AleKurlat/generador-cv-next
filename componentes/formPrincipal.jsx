import { Form, FormGroup, Input, Button, Label, UncontrolledTooltip } from 'reactstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio, itemPrincipalVacio } = props;

    let arrayCampos = datosPrincipal.map((el, i) => {
        return (
            <div key={i} className="card2">
                <FormGroup>
                    <Label><h2>Titulo del apartado</h2></Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="titulo" value={datosPrincipal[i].titulo} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label><h3>Subtitulo del apartado</h3></Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="subtitulo" value={datosPrincipal[i].subtitulo} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                {datosPrincipal[i].items.map((item, j) => {
                    return (
                        <div className="parrafo" key={i + "+" + j}>
                            <div className="botonera">
                                <Button color="warning" id={"subirParrafo" + i + "x" + j} onClick={() => { subirParrafo(i, j) }}> <img src="/arrowup.png" /></Button>
                                <UncontrolledTooltip placement="bottom" target={"subirParrafo" + i + "x" + j} >Reubicar párrafo hacia arriba</UncontrolledTooltip>
                                <Button color="warning" id={"bajarParrafo" + i + "x" + j} onClick={() => { bajarParrafo(i, j) }}> <img src="/arrowdown.png" /></Button>
                                <UncontrolledTooltip placement="bottom" target={"bajarParrafo" + i + "x" + j} >Reubicar párrafo hacia abajo</UncontrolledTooltip>
                                <Button id={"eliminarParrafo" + i + "x" + j} onClick={() => { eliminarParrafo(i, j) }}><img src="/eliminar.svg" /></Button>
                                <UncontrolledTooltip placement="bottom" target={"eliminarParrafo" + i + "x" + j} >Eliminar párrafo</UncontrolledTooltip>
                            </div>
                            <FormGroup>
                                <Label><strong>Encabezado del párrafo</strong></Label>
                                <Input type="text" value={item.encabezadoP} name="encabezadoP" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Párrafo</Label>
                                <Input type="textarea" rows="4" value={item.parrafo} name="parrafo" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí"></Input>
                            </FormGroup>
                        </div>
                    )
                })}
                <div className="botonera">
                    <Button color="primary" onClick={() => { agregarParrafo(i) }}>Agregar nuevo párrafo</Button>
                </div>
                <div className="botonera">
                    <Button color="info" id={"subirApartado" + i} onClick={() => { subirApartado(i) }}><img src="/arrowup.png" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"subirApartado" + i} >Reubicar apartado hacia arriba</UncontrolledTooltip>
                    <Button color="info" id={"bajarApartado" + i} onClick={() => { bajarApartado(i) }}><img src="/arrowdown.png" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"bajarApartado" + i} >Reubicar apartado hacia abajo</UncontrolledTooltip>
                    <Button id={"eliminarApartado" + i} onClick={() => { eliminarApartado(i) }}><img src="/eliminar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"eliminarApartado" + i} >Eliminar apartado</UncontrolledTooltip>
                </div>
            </div>
        )
    });

    function handler(evento, i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i] = { ...arrayProvisorio[i], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    function handlerItem(evento, i, j) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items[j] = { ...arrayProvisorio[i].items[j], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    function agregarApartado() {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio.push(objPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    function eliminarApartado(i) {
        if (datosPrincipal.length > 1) {
            let arrayProvisorio = [...datosPrincipal];
            arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
            setDatosPrincipal(arrayProvisorio);
        } else {
            swal("El CV debe tener por lo menos un apartado");
        }
    }

    function subirApartado(viejoOrden) {
        let elementoMovido = [...datosPrincipal][viejoOrden];
        let arrayProvisorio = [...datosPrincipal].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = 0;
        if (viejoOrden > 0) { nuevoOrden = viejoOrden - 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function bajarApartado(viejoOrden) {
        const cantDestacados = datosPrincipal.length;
        let elementoMovido = [...datosPrincipal][viejoOrden];
        let arrayProvisorio = [...datosPrincipal].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = cantDestacados - 1;
        if (viejoOrden < (cantDestacados - 1)) { nuevoOrden = viejoOrden + 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function eliminarParrafo(i, j) {
        if (datosPrincipal[i].items.length > 1) {
            let arrayProvisorio = [...datosPrincipal];
            arrayProvisorio[i].items = arrayProvisorio[i].items.filter((el, h) => { return (h != j) });
            setDatosPrincipal(arrayProvisorio);
        } else {
            swal("Cada apartado debe tener al menos un párrafo");
        }
    }

    function subirParrafo(numeroApartado, viejoOrdenParr) {
        let arrayProvisorio = [...datosPrincipal];
        let elementoMovido = arrayProvisorio[numeroApartado].items[viejoOrdenParr];
        arrayProvisorio[numeroApartado].items = arrayProvisorio[numeroApartado].items.filter((elemento, j) => {
            return (j !== viejoOrdenParr)
        });

        let nuevoOrdenParr = 0;
        if (viejoOrdenParr > 0) { nuevoOrdenParr = viejoOrdenParr - 1 }
        arrayProvisorio[numeroApartado].items.splice(nuevoOrdenParr, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function bajarParrafo(numeroApartado, viejoOrdenParr) {
        const cantParrafos = datosPrincipal[numeroApartado].items.length;
        let arrayProvisorio = [...datosPrincipal];
        let elementoMovido = arrayProvisorio[numeroApartado].items[viejoOrdenParr];
        arrayProvisorio[numeroApartado].items = arrayProvisorio[numeroApartado].items.filter((elemento, j) => {
            return (j !== viejoOrdenParr)
        });

        let nuevoOrdenParr = cantParrafos - 1;
        if (viejoOrdenParr < (cantParrafos - 1)) { nuevoOrdenParr = viejoOrdenParr + 1 }
        arrayProvisorio[numeroApartado].items.splice(nuevoOrdenParr, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function agregarParrafo(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items.push(itemPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <section className="cuadroPrincipal">
            <Form>
                {arrayCampos}
                <Button color="primary" onClick={agregarApartado} style={{ "marginBottom": "20px" }}>Agregar nuevo apartado</Button>
            </Form>
        </section>
    )
}