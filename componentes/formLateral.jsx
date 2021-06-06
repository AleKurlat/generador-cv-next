import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormLateral(props) {
    const { datosLateral, setDatosLateral, objLateralVacio } = props;

    let arrayCampos = datosLateral.map((el, i) => {
        return (
            <div key={i} className="card2">
                <FormGroup>
                    <Label>
                        Tipo de dato (ej: teléfono, mail, etc.)
            </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="nombreItem" value={datosLateral[i].nombreItem}>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Valor del dato (ej: "123@gmail.com", "0000-0000")
            </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="valorItem" value={datosLateral[i].valorItem}>
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
            <h3>Datos de la barra lateral</h3>
            <Form className="card2">
                {arrayCampos}
                <Button className="mt-3" color="primary" size="lg" onClick={agregarCampo}>Agregar campo de datos</Button>
            </Form>
        </section>
    )
}