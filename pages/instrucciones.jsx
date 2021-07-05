import Layout from '../componentes/layout.jsx';
import Link from 'next/link';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

export default function Instrucciones() {
    return (
        <Layout>
            <div className="contenedor d-flex flex-column">
                <h3>Instructivo para guardar como PDF</h3>
                <img src="/print01.png" className="my-3 p-3 mx-auto" alt="Instrucciones de impresión" style={{ maxWidth: "300px", border: "1px solid lightgray" }} />
                <img src="/print02.png" className="my-3 p-3 mx-auto" alt="Instrucciones de impresión" style={{ maxWidth: "300px", border: "1px solid lightgray" }} />
                <img src="/print03.png" className="my-3 p-3 mx-auto" alt="Instrucciones de impresión" style={{ maxWidth: "300px", border: "1px solid lightgray" }} />
                <Form><Link href="/verCV" passHref><Button className="mt-3" color="primary" size="lg">Volver a CV</Button></Link></Form>
            </div>
        </Layout>
    )
}