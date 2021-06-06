import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormHeader(props) {
    const { datosHeader, setDatosHeader } = props;

    function handler(e) {
        setDatosHeader({ ...datosHeader, [e.target.name]: e.target.value });
    };

    return (
        <section>
            <h3>Datos de la cabecera</h3>
            <Form className="card2">
                <FormGroup>
                    <Label>
                        Apellido y nombre
                    </Label>
                    <Input type="text" onChange={handler} name="nombre" value={datosHeader.nombre}>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Descripción
                    </Label>
                    <Input type="text" onChange={handler} name="descripcion" value={datosHeader.descripcion}>
                    </Input>
                </FormGroup>
            </Form>
        </section>
    )
}