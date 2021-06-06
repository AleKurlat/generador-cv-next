import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio, itemPrincipalVacio } = props;

    let arrayCampos = datosPrincipal.map((el, i) => {
        return (
            <div key={i} className="card2">
                <FormGroup>
                    <Label>Titulo del apartado</Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="titulo" value={datosPrincipal[i].titulo}>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Subtitulo del apartado</Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="subtitulo" value={datosPrincipal[i].subtitulo}>
                    </Input>
                </FormGroup>
                {datosPrincipal[i].items.map((item, j) => {
                    return (
                        <div className="card2" key={i + "+" + j}>
                            <FormGroup>
                                <Label>Encabezado del párrafo</Label>
                                <Input type="text" value={item.encabezadoP} name="encabezadoP" onChange={(evento) => { handlerItem(evento, i, j) }} ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Párrafo</Label>
                                <Input type="text" value={item.parrafo} name="parrafo" onChange={(evento) => { handlerItem(evento, i, j) }}></Input>
                            </FormGroup>
                            <Button color="danger" onClick={() => { eliminarParrafo(i, j) }}>Eliminar parrafo</Button>
                        </div>
                    )
                })}
                <Button onClick={() => { agregarParrafo(i) }}>Agregar párrafo</Button>
                <Button color="danger" onClick={() => { eliminarApartado(i) }}>Eliminar apartado</Button>
            </div>
        )
    });

    function handler(evento, i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i] = { ...arrayProvisorio[i], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    function handlerItem(evento, i, j) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items[j] = { ...arrayProvisorio[i].items[j], [evento.target.name]: evento.target.value }
        setDatosPrincipal(arrayProvisorio);
    };

    function agregarApartado() {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio.push(objPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    function eliminarApartado(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio = arrayProvisorio.filter((el, j) => { return (j != i) });
        setDatosPrincipal(arrayProvisorio);
    }

    function eliminarParrafo(i, j) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items = arrayProvisorio[i].items.filter((el, h) => { return (h != j) });
        setDatosPrincipal(arrayProvisorio);
    }

    function agregarParrafo(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items.push(itemPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <section>
            <h3>Datos del cuerpo principal</h3>
            <Form className="card2">
                {arrayCampos}
                <Button className="mt-3" color="primary" onClick={agregarApartado}>Agregar apartado</Button>
            </Form>
        </section>
    )
}