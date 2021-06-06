import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormImagen(props) {
    const { urlImagen, setUrlImagen } = props;

    function handler(e) {
        setUrlImagen(e.target.value);
    };

    function guardarForm(evento) {
        evento.preventDefault();
        console.log(urlImagen);
    }

    return (
        <>
            <h3>Foto de CV</h3>
            <Form className="card2" onSubmit={guardarForm}>
                <FormGroup>
                    <Label>
                        Foto de CV
                    </Label>
                    <Input type="text" onChange={handler} value={urlImagen}>
                    </Input>
                </FormGroup>
                <Button type="submit" className="mt-3" color="primary" size="lg">Mostrar datos</Button>
            </Form>
        </>
    )
}