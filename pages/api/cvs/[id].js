// van metodos GET y PUT
const fuenteDatos = "usuarios";
const { insertar, buscarPorID, borrarPorID, editarPorID, buscarPorCampo } = require("../../../APIutil/model.js");
import { auth } from "../../../APIutil/auth";

async function handler(req, res, datosToken) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query;
            if (id !== datosToken.user_id) {
                res.statusCode = 403;
                throw new Error("Los CVs solo se pueden acceder desde el usuario generador");
            }
            let respuesta = await buscarPorID(fuenteDatos, id);
            if (respuesta.length == 0) {
                res.statusCode = 404;
                throw new Error("No se encontró ningún usuario con ese ID");
            }
            respuesta = respuesta[0].cv;  // devuelve solo el CV de la persona
            res.send(respuesta);
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
    if (req.method === 'PUT') {
        try {
            const { id } = req.query;
            const objeto = req.body;
            if (id !== datosToken.user_id) {
                res.statusCode = 403;
                throw new Error("Los CVs solo se pueden modificar desde el usuario generador");
            }
            const respuesta = await editarPorID(fuenteDatos, id, objeto);
            res.send(respuesta);
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default auth(handler);