import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio } = props;

    let arrayCampos = datosPrincipal.map((el, i) => {
        return (
            <div key={i} className="card2">
                <FormGroup>
                    <Label>
                        Tipo de dato (ej: teléfono, mail, etc.)
            </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="nombreItem" value={datosPrincipal[i].nombreItem}>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Valor del dato (ej: "123@gmail.com", "0000-0000")
            </Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="valorItem" value={datosPrincipal[i].valorItem}>
                    </Input>
                </FormGroup>
                <Button color="danger" onClick={() => { eliminarCampo(i) }}>Eliminar campo</Button>
            </div>
        )
    });

    function handler(evento, i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i] = { ...arrayProvisorio[i], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    function agregarCampo() {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio.push(objLateralVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    function eliminarCampo(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <section>
            <h3>Datos del cuerpo principal</h3>
            <Form className="card2">
                {arrayCampos}
                <Button className="mt-3" color="primary" onClick={agregarCampo}>Agregar campo de datos</Button>
            </Form>
        </section>
    )
}