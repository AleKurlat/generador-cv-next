import { Form, Button, UncontrolledTooltip } from 'reactstrap';
import EditCampoLat from './editCampoLat';

export default function FormLateral(props) {
    const { datosLateral, setDatosLateral, objLateralVacio } = props;
    let arrayCampos = datosLateral.map((el, i) => {
        const objProps = { i, datosLateral, setDatosLateral }
        return <EditCampoLat key={i} {...objProps} />
    });

    function agregarCampo() {
        let arrayProvisorio = [...datosLateral];
        arrayProvisorio.push(objLateralVacio);
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