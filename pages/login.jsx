import React, { useState } from 'react';
import { preLoader, responderError, hostAPI } from "../librerias/lib.jsx";
//import { login } from "../../librerias/libreriaAdmins.jsx";
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from "axios";
import Layout from '../componentes/layout.jsx';

export default function AdminLogin(props) {

    const [objLogin, setObjLogin] = useState({
        email: "",
        clave: ""
    });
    const [statePreLoader, preLoaderOn] = useState(false);
    const { token, setToken } = props;
    const router = useRouter();

    function cambiarValorInput(e) {
        setObjLogin({ ...objLogin, [e.target.name]: e.target.value });
    };

    async function login(objLogin) {
        try {
            const urlAPI = hostAPI + "/login";
            const loguear = await axios.post(urlAPI, objLogin);
            if (loguear && loguear.status === 200) {
                return loguear.data.token;
            }
        }
        catch (e) {
            return responderError(e)
        }
    }

    async function guardarForm(e) {
        e.preventDefault();
        preLoaderOn(true);
        const respuesta = await login(objLogin);
        preLoaderOn(false);
        if (respuesta) {
            setToken(respuesta);
            if (typeof window !== "undefined") {
                localStorage.setItem("token", respuesta);
            }
            router.push("/cargarDatos");
        }
    }

    let zonaPreLoader;
    if (statePreLoader) { zonaPreLoader = preLoader };

    return (
        <Layout>
            <div>
                <Form className="align-items-stretch text-start card2" onSubmit={guardarForm}>
                    <h3>Ingresar usuario</h3>
                    {zonaPreLoader}
                    <FormGroup>
                        <Label>Email</Label>
                        <Input className="my-3" type="text" onChange={cambiarValorInput} value={objLogin.email} name="email" required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Contraseña</Label>
                        <Input className="my-3" type="password" onChange={cambiarValorInput} value={objLogin.clave} name="clave" required />
                    </FormGroup>
                    <Button type="submit" className="mt-3" color="primary" size="lg">Ingresar</Button>
                </Form>
            </div>
        </Layout>
    )
}