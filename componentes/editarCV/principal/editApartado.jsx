import { FormGroup, Input, Button, Label, UncontrolledTooltip } from 'reactstrap';
import React, { useEffect, useRef } from 'react';
import EditParrafo from './editParrafo';
import swal from 'sweetalert';

export default function EditApartado(props) {

    const { i, datosPrincipal, setDatosPrincipal, itemPrincipalVacio } = props;
    const referencia = useRef(null);

    useEffect(() => { referencia.current.style.opacity = 1 }, [])

    function handler(evento, i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i] = { ...arrayProvisorio[i], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    async function eliminarApartado(i) {
        if (datosPrincipal.length > 1) {
            const confirmar = await swal({
                text: "Estás por eliminar el apartado seleccionado",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
            });
            if (confirmar) {
                const elem = referencia.current;
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

    function agregarParrafo(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items.push(itemPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <div className="card2" ref={referencia} style={{ opacity: 0 }}>
            <div className="grupo">
                <FormGroup>
                    <Label><h2>Titulo del apartado</h2></Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="titulo" value={datosPrincipal[i].titulo} placeholder="Escriba aquí (ejemplo: 'Experiencia laboral')">
                    </Input>
                </FormGroup>
                <div className="parrafos">
                    {datosPrincipal[i].items.map((item, j) => {
                        const objProps = { item, j, i, datosPrincipal, setDatosPrincipal }
                        return <EditParrafo {...objProps} key={i + "+" + j} />
                    })}
                </div>
                <div className="botonera">
                </div>
            </div>
            <div className="botonera apart">
                <Button color="primary" size="sm" id={"eliminarApartado" + i} onClick={() => { eliminarApartado(i) }}><img src="/eliminar.svg" /></Button>
                <UncontrolledTooltip placement="bottom" target={"eliminarApartado" + i} >Eliminar apartado</UncontrolledTooltip>
                <Button color="primary" size="sm" id={"subirApartado" + i} onClick={() => { subirApartado(i) }}><img src="/arrowup.png" /></Button>
                <UncontrolledTooltip placement="bottom" target={"subirApartado" + i} >Reubicar apartado hacia arriba</UncontrolledTooltip>
                <Button color="primary" size="sm" id={"bajarApartado" + i} onClick={() => { bajarApartado(i) }}><img src="/arrowdown.png" /></Button>
                <UncontrolledTooltip placement="bottom" target={"bajarApartado" + i} >Reubicar apartado hacia abajo</UncontrolledTooltip>
                <Button color="primary" id={"agregarParrafo" + i} onClick={() => { agregarParrafo(i) }}><img src="/agregar.svg" /></Button>
                <UncontrolledTooltip placement="bottom" target={"agregarParrafo" + i} >Agregar nuevo párrafo</UncontrolledTooltip>
            </div>
        </div>
    )
}