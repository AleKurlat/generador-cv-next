import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function FormPrincipal(props) {
    const { datosPrincipal, setDatosPrincipal, objPrincipalVacio, itemPrincipalVacio } = props;

    let arrayCampos = datosPrincipal.map((el, i) => {
        return (
            <div key={i} className="card2">
                <FormGroup>
                    <Label><h2>Titulo del apartado</h2></Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="titulo" value={datosPrincipal[i].titulo} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label><h3>Subtitulo del apartado</h3></Label>
                    <Input type="text" onChange={(evento) => { handler(evento, i) }} name="subtitulo" value={datosPrincipal[i].subtitulo} placeholder="Escriba aquí">
                    </Input>
                </FormGroup>
                {datosPrincipal[i].items.map((item, j) => {
                    return (
                        <div className="parrafo" key={i + "+" + j}>
                            <FormGroup>
                                <Label><strong>Encabezado del párrafo</strong></Label>
                                <Input type="text" value={item.encabezadoP} name="encabezadoP" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Párrafo</Label>
                                <Input type="textarea" rows="4" value={item.parrafo} name="parrafo" onChange={(evento) => { handlerItem(evento, i, j) }} placeholder="Escriba aquí"></Input>
                            </FormGroup>
                            <div className="botonera">
                                <Button color="warning" onClick={() => { subirParrafo(i, j) }}>Subir este párrafo</Button>
                                <Button color="warning" onClick={() => { bajarParrafo(i, j) }}>Bajar este párrafo</Button>
                                <Button color="danger" onClick={() => { eliminarParrafo(i, j) }}>Eliminar este párrafo</Button>
                            </div>
                        </div>
                    )
                })}
                <div className="botonera">
                    <Button color="primary" onClick={() => { agregarParrafo(i) }}>Agregar nuevo párrafo</Button>
                </div>
                <div className="botonera">
                    <Button color="info" onClick={() => { subirApartado(i) }}>Subir este apartado</Button>
                    <Button color="info" onClick={() => { bajarApartado(i) }}>Bajar este apartado</Button>
                    <Button color="danger" onClick={() => { eliminarApartado(i) }}>Eliminar este apartado</Button>
                </div>
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

    function subirApartado(viejoOrden) {
        let elementoMovido = [...datosPrincipal][viejoOrden];
        let arrayProvisorio = [...datosPrincipal].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = 0;
        if (viejoOrden > 0) { nuevoOrden = viejoOrden - 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function bajarApartado(viejoOrden) {
        const cantDestacados = datosPrincipal.length;
        let elementoMovido = [...datosPrincipal][viejoOrden];
        let arrayProvisorio = [...datosPrincipal].filter((elemento, j) => {
            return (j !== viejoOrden)
        });
        let nuevoOrden = cantDestacados - 1;
        if (viejoOrden < (cantDestacados - 1)) { nuevoOrden = viejoOrden + 1 }
        arrayProvisorio.splice(nuevoOrden, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function eliminarParrafo(i, j) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items = arrayProvisorio[i].items.filter((el, h) => { return (h != j) });
        setDatosPrincipal(arrayProvisorio);
    }

    function subirParrafo(numeroApartado, viejoOrdenParr) {
        let arrayProvisorio = [...datosPrincipal];
        let elementoMovido = arrayProvisorio[numeroApartado].items[viejoOrdenParr];
        arrayProvisorio[numeroApartado].items = arrayProvisorio[numeroApartado].items.filter((elemento, j) => {
            return (j !== viejoOrdenParr)
        });

        let nuevoOrdenParr = 0;
        if (viejoOrdenParr > 0) { nuevoOrdenParr = viejoOrdenParr - 1 }
        arrayProvisorio[numeroApartado].items.splice(nuevoOrdenParr, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function bajarParrafo(numeroApartado, viejoOrdenParr) {
        const cantParrafos = datosPrincipal[numeroApartado].items.length;
        let arrayProvisorio = [...datosPrincipal];
        let elementoMovido = arrayProvisorio[numeroApartado].items[viejoOrdenParr];
        arrayProvisorio[numeroApartado].items = arrayProvisorio[numeroApartado].items.filter((elemento, j) => {
            return (j !== viejoOrdenParr)
        });

        let nuevoOrdenParr = cantParrafos - 1;
        if (viejoOrdenParr < (cantParrafos - 1)) { nuevoOrdenParr = viejoOrdenParr + 1 }
        arrayProvisorio[numeroApartado].items.splice(nuevoOrdenParr, 0, elementoMovido);
        setDatosPrincipal(arrayProvisorio);
    }

    function agregarParrafo(i) {
        let arrayProvisorio = [...datosPrincipal];
        arrayProvisorio[i].items.push(itemPrincipalVacio);
        setDatosPrincipal(arrayProvisorio);
    }

    return (
        <section className="cuadroPrincipal">
            <Form>
                {arrayCampos}
                <Button color="primary" onClick={agregarApartado} style={{ "marginBottom": "20px" }}>Agregar nuevo apartado</Button>
            </Form>
        </section>
    )
}