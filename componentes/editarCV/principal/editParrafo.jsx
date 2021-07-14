import { FormGroup, Input, Button, Label, UncontrolledTooltip } from 'reactstrap';
import { useEffect, useState } from 'react';

export default function editParrafo(props) {
    const { item, j, i, datosPrincipal, setDatosPrincipal } = props;
    const [clase, setClase] = useState("parrafo inicial")

    useEffect(() => {
        setClase("parrafo");
    }, [])

    function onBorrado(e) {
        if (e.target === e.currentTarget && clase === "parrafo borrado") {
            let arrayProvisorio = [...datosPrincipal];
            arrayProvisorio[i].items = arrayProvisorio[i].items.filter((el, h) => { return (h != j) });
            setDatosPrincipal(arrayProvisorio);
        }
    }

    function handlerItem(evento, i, j) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items[j] = { ...arrayProvisorio[i].items[j], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    async function eliminarParrafo(i, j) {
        if (datosPrincipal[i].items.length > 1) {
            const confirmar = await swal({
                text: "Estás por eliminar el párrafo seleccionado",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
            });
            if (confirmar) {
                setClase("parrafo borrado")
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

    return (
        <div className={clase} onTransitionEnd={onBorrado} >
            <FormGroup>
                <Label><h3>Título del párrafo (optativo)</h3></Label>
                <Input type="text" value={item.encabezadoP} name="encabezadoP" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí (ejemplo: 'Atención al cliente')"></Input>
            </FormGroup>
            <FormGroup>
                <Label>Párrafo</Label>
                <Input type="textarea" rows="4" value={item.parrafo} name="parrafo" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí (ejemplos: 'Empresa X', 'Período 2010-2015')"></Input>
            </FormGroup>
            <div className="botonera" >
                <Button color="primary" id={"subirParrafo" + i + "x" + j} onClick={() => { subirParrafo(i, j) }}> <img src="/arrowup.png" /></Button>
                <UncontrolledTooltip placement="bottom" target={"subirParrafo" + i + "x" + j} >Reubicar párrafo hacia arriba</UncontrolledTooltip>
                <Button color="primary" id={"bajarParrafo" + i + "x" + j} onClick={() => { bajarParrafo(i, j) }}> <img src="/arrowdown.png" /></Button>
                <UncontrolledTooltip placement="bottom" target={"bajarParrafo" + i + "x" + j} >Reubicar párrafo hacia abajo</UncontrolledTooltip>
                <Button color="primary" id={"eliminarParrafo" + i + "x" + j} onClick={() => { eliminarParrafo(i, j) }}><img src="/eliminar.svg" /></Button>
                <UncontrolledTooltip placement="bottom" target={"eliminarParrafo" + i + "x" + j} >Eliminar párrafo</UncontrolledTooltip>
            </div>
        </div>
    )
}