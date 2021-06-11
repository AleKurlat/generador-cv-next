import React, { useState } from 'react';
import { preLoader, responderError, hostAPI } from "../librerias/lib.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Link from 'next/link';
import Layout from '../componentes/layout.jsx';
import axios from "axios";

export default function Registro(props) {

    const userVacio = {
        clave: "",
        email: "",
    }
    const [objRegistro, setObjRegistro] = useState(userVacio);
    const [statePreLoader, preLoaderOn] = useState(false);
    const { token } = props;
    const autorizacion = { headers: { Authorization: token } };
    const router = useRouter();

    function cambiarValorInput(e) {
        setObjRegistro({ ...objRegistro, [e.target.name]: e.target.value });
    };

    async function registrarAdmin(objRegistro) {
        try {
            const url = hostAPI + "/registrar"
            const registrar = await axios.post(url, objRegistro, autorizacion);
            if (registrar && registrar.status === 200) {
                return true;
            }
        }
        catch (e) { return responderError(e) }
    }

    async function guardarForm(evento) {
        evento.preventDefault();
        preLoaderOn(true);
        const resultadoOp = await registrarAdmin(objRegistro);
        preLoaderOn(false);
        if (resultadoOp && resultadoOp !== 403) {
            swal("Usuario guardado correctamente");
            router.push("/login");
        }
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <Layout>
            <Form className="card2 align-items-stretch text-start" onSubmit={guardarForm}>
                <h3>Registrar nuevo usuario</h3>
                {zonaPreLoader}
                <FormGroup>
                    <Label>Email</Label>
                    <Input className="my-3" type="text" onChange={cambiarValorInput} value={objRegistro.email} name="email" required />
                </FormGroup>
                <FormGroup>
                    <Label>Contraseña</Label>
                    <Input className="my-3" type="password" onChange={cambiarValorInput} value={objRegistro.clave} name="clave" required />
                </FormGroup>
                <Button type="submit" className="mt-3" color="primary" size="lg">Guardar usuario</Button>
                <Link href="/login" passHref ><Button className="mt-3" color="primary" size="lg">Volver al login</Button></Link>
            </Form>
        </Layout>
    )
}