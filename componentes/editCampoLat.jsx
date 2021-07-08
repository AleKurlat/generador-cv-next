import { FormGroup, Input, Button, Label, UncontrolledTooltip } from 'reactstrap';
import swal from 'sweetalert';

export default function EditCampoLat(props) {
    const { i, datosLateral, setDatosLateral } = props;

    function handler(evento, i) {
        let arrayProvisorio = [...datosLateral];
        arrayProvisorio[i] = { ...arrayProvisorio[i], [evento.target.name]: evento.target.value }
        setDatosLateral(arrayProvisorio);
    };

    function subirCampo(viejoOrden) {
        let elementoMovido = [...datosLateral][viejoOrden];
        let arrayProvisorio = [...datosLateral].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = 0;
        if (viejoOrden > 0) { nuevoOrden = viejoOrden - 1 } else {
            swal("Este campo ya es el primero de todos")
        }
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
        if (viejoOrden < (cantDestacados - 1)) { nuevoOrden = viejoOrden + 1 } else {
            swal("Este campo ya es el último de todos")
        }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosLateral(arrayProvisorio);
    }

    async function eliminarCampo(i) {
        if (datosLateral.length > 1) {
            const confirmar = await swal({
                text: "Estás por eliminar el campo de datos seleccionado",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
            });
            if (confirmar) {
                let arrayProvisorio = [...datosLateral];
                arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
                setDatosLateral(arrayProvisorio);
            }
        } else {
            swal("La barra lateral debe tener al menos un campo de datos");
        }
    }

    return (
        <div className="parrafo">
            <FormGroup>
                <Label>
                    <h4>Tipo de dato </h4>
                    <div className="mb-2">Ejemplos: "mail", "teléfono", etc.</div>
                </Label>
                <Input type="text" onChange={(evento) => { handler(evento, i) }} name="nombreItem" value={datosLateral[i].nombreItem} placeholder="Escriba aquí">
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>
                    <h4>Valor del dato</h4>
                    <div className="mb-2">Ejemplos: "123@gmail.com", "15-4000-0000"</div>
                </Label>
                <Input type="text" onChange={(evento) => { handler(evento, i) }} name="valorItem" value={datosLateral[i].valorItem} placeholder="Escriba aquí">
                </Input>
            </FormGroup>
            <div className="botonera">
                <Button color="primary" id={"subirCampo" + i} onClick={() => { subirCampo(i) }}><img src="/arrowup.png" /></Button>
                <UncontrolledTooltip placement="bottom" target={"subirCampo" + i} >Reubicar campo hacia arriba</UncontrolledTooltip>
                <Button color="primary" id={"bajarCampo" + i} onClick={() => { bajarCampo(i) }}><img src="/arrowdown.png" /></Button>
                <UncontrolledTooltip placement="bottom" target={"bajarCampo" + i} >Reubicar campo hacia abajo</UncontrolledTooltip>
                <Button color="primary" id={"eliminarCampo" + i} onClick={() => { eliminarCampo(i) }}><img src="/eliminar.svg" /></Button>
                <UncontrolledTooltip placement="bottom" target={"eliminarCampo" + i} >Eliminar campo</UncontrolledTooltip>
            </div>
        </div>

    )
}