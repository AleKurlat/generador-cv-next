import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormImagen(props) {
    const { urlImagen, setUrlImagen } = props;

    function handler(e) {
        setUrlImagen(e.target.value);
    };

    return (
        <section>
            <h3>Foto de CV</h3>
            <Form className="card2">
                <FormGroup>
                    <Label>
                        Foto de CV
                    </Label>
                    <Input type="text" onChange={handler} value={urlImagen}>
                    </Input>
                </FormGroup>
            </Form>
        </section>
    )
}