import { Form, FormGroup, Input, Button, Label, UncontrolledTooltip } from 'reactstrap';
import React, { useState, useEffect, useRef, createRef } from 'react';
import swal from 'sweetalert';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio, itemPrincipalVacio } = props;
    const refs = useRef(null);
    refs.current = datosPrincipal.map(elemento => { return createRef() });

    let arrayCampos = datosPrincipal.map((el, i) => {
        return (
            <div key={i} className="card2" ref={refs.current[i]} style={{ opacity: 0 }}>
                <FormGroup>
                    <Label><h2>Titulo del apartado</h2></Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="titulo" value={datosPrincipal[i].titulo} placeholder="Escriba aquí (ejemplo: 'Experiencia laboral')">
                    </Input>
                </FormGroup>
                {datosPrincipal[i].items.map((item, j) => {
                    return (
                        <div className="parrafo" key={i + "+" + j}>
                            <FormGroup>
                                <Label><h3>Título del párrafo (optativo)</h3></Label>
                                <Input type="text" value={item.encabezadoP} name="encabezadoP" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí (ejemplo: 'Atención al cliente')"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Párrafo</Label>
                                <Input type="textarea" rows="4" value={item.parrafo} name="parrafo" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí (ejemplos: 'Empresa X', 'Período 2010-2015')"></Input>
                            </FormGroup>
                            <div className="botonera">
                                <Button color="primary" id={"subirParrafo" + i + "x" + j} onClick={() => { subirParrafo(i, j) }}> <img src="/arrowup.png" /></Button>
                                <UncontrolledTooltip placement="bottom" target={"subirParrafo" + i + "x" + j} >Reubicar párrafo hacia arriba</UncontrolledTooltip>
                                <Button color="primary" id={"bajarParrafo" + i + "x" + j} onClick={() => { bajarParrafo(i, j) }}> <img src="/arrowdown.png" /></Button>
                                <UncontrolledTooltip placement="bottom" target={"bajarParrafo" + i + "x" + j} >Reubicar párrafo hacia abajo</UncontrolledTooltip>
                                <Button color="primary" id={"eliminarParrafo" + i + "x" + j} onClick={() => { eliminarParrafo(i, j) }}><img src="/eliminar.svg" /></Button>
                                <UncontrolledTooltip placement="bottom" target={"eliminarParrafo" + i + "x" + j} >Eliminar párrafo</UncontrolledTooltip>
                            </div>
                        </div>
                    )
                })}
                <div className="botonera">
                    <Button color="primary" id={"agregarParrafo" + i} onClick={() => { agregarParrafo(i) }}><img src="/agregar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"agregarParrafo" + i} >Agregar nuevo párrafo</UncontrolledTooltip>
                </div>
                <div className="botonera">
                    <Button color="primary" size="sm" id={"subirApartado" + i} onClick={() => { subirApartado(i) }}><img src="/arrowup.png" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"subirApartado" + i} >Reubicar apartado hacia arriba</UncontrolledTooltip>
                    <Button color="primary" size="sm" id={"bajarApartado" + i} onClick={() => { bajarApartado(i) }}><img src="/arrowdown.png" /></Button>
                    <UncontrolledTooltip placement="bottom" target={"bajarApartado" + i} >Reubicar apartado hacia abajo</UncontrolledTooltip>
                    <Button color="primary" size="sm" id={"eliminarApartado" + i} onClick={() => { eliminarApartado(i) }}><img src="/eliminar.svg" /></Button>
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

    async function eliminarApartado(i) {
        if (datosPrincipal.length > 1) {
            const confirmar = await swal({
                text: "Estás por eliminar el apartado seleccionado",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
            });
            if (confirmar) {
                const elem = refs.current[i].current;
                function callback() {
                    elem.removeEventListener('transitionend', callback);
                    let arrayProvisorio = [...datosPrincipal];
                    arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
                    setDatosPrincipal(arrayProvisorio);
                }
                elem.addEventListener('transitionend', callback);
                elem.style.opacity = 0;
            }
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
        if (viejoOrden > 0) { nuevoOrden = viejoOrden - 1 } else {
            swal("Este apartado ya es el primero de todos")
        }
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
        if (viejoOrden < (cantDestacados - 1)) { nuevoOrden = viejoOrden + 1 } else {
            swal("Este apartado ya es el último de todos")
        }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    async function eliminarParrafo(i, j) {
        if (datosPrincipal[i].items.length > 1) {
            const confirmar = await swal({
                text: "Estás por eliminar el párrafo seleccionado",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
            });
            if (confirmar) {
                let arrayProvisorio = [...datosPrincipal];
                arrayProvisorio[i].items = arrayProvisorio[i].items.filter((el, h) => { return (h != j) });
                setDatosPrincipal(arrayProvisorio);
            }
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
        if (viejoOrdenParr > 0) { nuevoOrdenParr = viejoOrdenParr - 1 } else {
            swal("Este párrafo ya es el primero de todos")
        }
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
        if (viejoOrdenParr < (cantParrafos - 1)) { nuevoOrdenParr = viejoOrdenParr + 1 } else {
            swal("Este párrafo ya es el último de todos")
        }
        arrayProvisorio[numeroApartado].items.splice(nuevoOrdenParr, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function agregarParrafo(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items.push(itemPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    useEffect(() => {
        refs.current.forEach(element => {
            element.current.style.opacity = 1;
        });
    }, [datosPrincipal.length])

    return (
        <section className="cuadroPrincipal">
            <Form>
                {arrayCampos}
                <div className="botonera">
                    <Button color="primary" id="agregarApartado" onClick={agregarApartado} style={{ "marginBottom": "20px" }}><img src="/agregar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target="agregarApartado" >Agregar nuevo apartado</UncontrolledTooltip>
                </div>
            </Form>
        </section>
    )
}