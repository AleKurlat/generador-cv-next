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
                        <h4>URL de foto de CV</h4>
                        <div className="mb-2">Debe ser una dirección pública que incluya el formato del archivo (ej. "www.imagen.jpg")</div>
                    </Label>
                    <Input type="text" onChange={handler} value={urlImagen} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
            </Form>
        </section>
    )
}