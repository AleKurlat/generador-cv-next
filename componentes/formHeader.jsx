import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormHeader(props) {
    const { datosHeader, setDatosHeader } = props;

    function handler(e) {
        setDatosHeader({ ...datosHeader, [e.target.name]: e.target.value });
    };

    return (
        <Form className="header">
            <FormGroup>
                <Label><h3>Apellido y nombre</h3></Label>
                <Input type="text" onChange={handler} name="nombre" value={datosHeader.nombre} placeholder="Escriba aquí">
                </Input>
            </FormGroup>
            <FormGroup>
                <Label><strong>Descripción (optativo)</strong></Label>
                <Input type="text" onChange={handler} name="descripcion" value={datosHeader.descripcion} placeholder="Escriba aquí (ejemplo: 'Asistente administrativo')">
                </Input>
            </FormGroup>
        </Form>
    )
}