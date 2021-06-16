const fuenteDatos = "usuarios";
const { insertar, buscarPorCampo } = require("../../APIutil/model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { clave, email } = req.body;
      if (!email || !clave) {
        res.statusCode = 400;
        throw new Error("No enviaste todos los datos necesarios");
      }

      //paso 1: busco el usuario en base de datos
      const respuesta = await buscarPorCampo(fuenteDatos, "email", email)
      if (respuesta.length == 0) {
        res.statusCode = 404;
        throw new Error("No se ha registrado ningún usuario con ese email");
      }

      // Paso 2: verificar que clave ingresada coincida con la encriptada en base de datos

      const recuperarClaveEncriptada = respuesta[0].clave;
      if (!bcrypt.compareSync(clave, recuperarClaveEncriptada)) {
        res.statusCode = 400;
        throw new Error("Ha ingresado incorrectamente la clave");
      }

      // paso 3: sesion
      const tokenData = {
        "email": respuesta[0].email,
        "user_id": respuesta[0]._id
      } // equivale a pulsera de reconocimiento en festivales

      const token = jwt.sign(tokenData, "Secret", {
        expiresIn: 60 * 60 * 24 // expira en 24 hs
      })
      res.send({ token });

      /*
      const { db } = await connectToDatabase();
      const respuesta = await db.collection(coleccion).find().toArray();
      res.send(respuesta);
      */
    }
    catch (e) {
      if (res.statusCode === 200) { res.statusCode = 500 };
      res.send({ "Error": e.message });
    }
  }
}

export default handler;