import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal } = props;

    function handler(e) {
        setDatosPrincipal({ ...datosPrincipal, [e.target.name]: e.target.value });
    };

    function guardarForm(evento) {
        evento.preventDefault();
        console.log(datosPrincipal);
    }

    return (
        <section>
            <h3>Datos del cuerpo principal</h3>
            <Form className="card2" onSubmit={guardarForm}>
                <FormGroup>
                    <Label>
                        Apellido y nombre
                    </Label>
                    <Input type="text" onChange={handler} name="nombre" value={datosPrincipal.nombre}>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Descripción
                    </Label>
                    <Input type="text" onChange={handler} name="descripcion" value={datosPrincipal.descripcion}>
                    </Input>
                </FormGroup>
                <Button type="submit" className="mt-3" color="primary" size="lg">Guardar datos</Button>
            </Form>
        </section>
    )
}