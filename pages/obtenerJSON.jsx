import { responderError, hostAPI, obtenerDatosToken } from "../librerias/lib.jsx";
import axios from "axios";
import { useState, useEffect } from 'react';

export default function ObtenerJSON(props) {
    const { token } = props;
    const autorizacion = { headers: { Authorization: token } };
    const [datos, setDatos] = useState();

    async function traerCV() {
        try {
            const datosToken = obtenerDatosToken(token);
            const id = datosToken.user_id;
            const urlAPI = hostAPI + "/cvs/" + id;
            const loguear = await axios.get(urlAPI, autorizacion);
            if (loguear && loguear.status === 200) {
                if (loguear.data) { setDatos(JSON.stringify(loguear.data)) }
            }
        }
        catch (e) { return responderError(e) }
    }

    useEffect(() => {
        if (token) { traerCV(); }
    }, [token])

    return (
        <div>{datos}</div>
    )
}