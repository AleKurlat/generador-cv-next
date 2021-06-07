import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormLateral(props) {
    const { datosLateral, setDatosLateral, objLateralVacio } = props;

    let arrayCampos = datosLateral.map((el, i) => {
        return (
            <div key={i} className="parrafo">
                <FormGroup>
                    <Label>
                        <strong>Tipo de dato </strong>
                        <div>Ej: "teléfono", "mail", etc.</div>
                    </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="nombreItem" value={datosLateral[i].nombreItem} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        <strong>Valor del dato</strong>
                        <div>Ej: "123@gmail.com", "0000-0000"</div>
                    </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="valorItem" value={datosLateral[i].valorItem} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                <Button color="danger" onClick={() => { eliminarCampo(i) }}>Eliminar campo</Button>
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

    function eliminarCampo(i) {
        let arrayProvisorio = [...datosLateral];
        arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
        setDatosLateral(arrayProvisorio);
    }

    return (
        <section>
            <Form>
                {arrayCampos}
                <Button className="mt-3" color="primary" onClick={agregarCampo}>Agregar campo de datos</Button>
            </Form>
        </section>
    )
}