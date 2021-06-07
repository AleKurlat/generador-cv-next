import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormImagen(props) {
    const { urlImagen, setUrlImagen } = props;

    function handler(e) {
        setUrlImagen(e.target.value);
    };

    return (
        <section>
            <Form>
                <FormGroup>
                    <Label>
                        <strong>URL de foto de CV</strong>
                        <div>Debe ser una dirección pública que incluya el formato del archivo (ej. "www.imagen.jpg")</div>
                    </Label>
                    <Input type="text" onChange={handler} value={urlImagen} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
            </Form>
        </section>
    )
}