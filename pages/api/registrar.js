const fuenteDatos = "usuarios";
const { insertar, buscarPorCampo } = require("../../APIutil/model.js");
const bcrypt = require("bcrypt");


async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { clave, email } = req.body;
            if (!clave || !email) {
                res.statusCode = 400;
                throw new Error("No enviaste todos los datos necesarios");
            }

            //valido que el usuario no esté ya en la base de datos
            let respuesta = await buscarPorCampo(fuenteDatos, "email", email);
            if (respuesta.length > 0) {
                res.statusCode = 400;
                throw new Error("Ya existe un usuario con ese correo electrónico");
            }

            // si esta todo bien, encripto la clave
            const claveEncriptada = await bcrypt.hash(clave, 10); // es asincronica asi que hay que agregarle siempre async al POST
            const objeto = { "email": email, "clave": claveEncriptada, "cv": {} }
            // Guardo el nuevo registro con la clave encriptada y le muestro al usuario los otros datos
            respuesta = await insertar(fuenteDatos, objeto);
            res.send(respuesta);
        }
        catch (e) {
            if (res.statusCode === 200) { res.statusCode = 500 };
            res.send({ "Error": e.message });
        }
    }
}

export default handler;