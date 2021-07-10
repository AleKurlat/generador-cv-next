import { Form, Button, UncontrolledTooltip } from 'reactstrap';
import EditCampoLat from './editCampoLat';

export default function FormLateral(props) {
    const { datosLateral, setDatosLateral, objLateralVacio } = props;
    let arrayCampos = datosLateral.map((el, i) => {
        const objProps = { i, datosLateral, setDatosLateral }
        return <EditCampoLat key={el.id} {...objProps} />
    });

    function agregarCampo() {

        const arrayIDs = datosLateral.map((campo) => { return (campo.id) });
        const maximoID = Math.max(...arrayIDs);
        const nuevoCampo = { ...objLateralVacio };
        nuevoCampo.id = maximoID + 1;
        let arrayProvisorio = [...datosLateral];
        arrayProvisorio.push(nuevoCampo);
        setDatosLateral(arrayProvisorio);
    }

    return (
        <section>
            <Form>
                {arrayCampos}
                <div className="botonera">
                    <Button id="agregarCampo" color="primary" onClick={agregarCampo}><img src="/agregar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target="agregarCampo" >Agregar campo de datos</UncontrolledTooltip>
                </div>
            </Form>
        </section>
    )
}