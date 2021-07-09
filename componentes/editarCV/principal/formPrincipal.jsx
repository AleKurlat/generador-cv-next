import { Form, Button, UncontrolledTooltip } from 'reactstrap';
import EditApartado from './editApartado';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio, itemPrincipalVacio } = props;

    function agregarApartado() {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio.push(objPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <section className="cuadroPrincipal">
            <Form>
                {datosPrincipal.map((el, i) => {
                    const objProps = { i, datosPrincipal, setDatosPrincipal, itemPrincipalVacio }
                    return <EditApartado key={i} {...objProps} />
                })}
                <div className="botonera">
                    <Button color="primary" id="agregarApartado" onClick={agregarApartado} style={{ "marginBottom": "20px" }}><img src="/agregar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target="agregarApartado" >Agregar nuevo apartado</UncontrolledTooltip>
                </div>
            </Form>
        </section>
    )
}