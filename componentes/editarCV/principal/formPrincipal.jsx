import { Form, Button, UncontrolledTooltip } from 'reactstrap';
import EditApartado from './editApartado';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio, itemPrincipalVacio } = props;

    function agregarApartado() {
        const arrayIDs = datosPrincipal.map((apartado) => { return (apartado.id) });
        const maximoID = Math.max(...arrayIDs);
        const nuevoApartado = { ...objPrincipalVacio };
        nuevoApartado.id = maximoID + 1;
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio.push(nuevoApartado);
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <section className="cuadroPrincipal">
            <Form>
                {datosPrincipal.map((el, i) => {
                    const objProps = { i, datosPrincipal, setDatosPrincipal, itemPrincipalVacio }
                    return <EditApartado key={el.id} {...objProps} />
                })}
                <div className="botonera">
                    <Button color="primary" id="agregarApartado" onClick={agregarApartado} style={{ "marginBottom": "20px" }}><img src="/agregar.svg" /></Button>
                    <UncontrolledTooltip placement="bottom" target="agregarApartado" >Agregar nuevo apartado</UncontrolledTooltip>
                </div>
            </Form>
        </section>
    )
}