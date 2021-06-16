const mongo = require('mongodb');
import { connectToDatabase } from "./mongodb";

async function buscar(col, query) {
    const { db } = await connectToDatabase();
    return await db.collection(col).find(query).toArray();
}

async function insertar(col, objeto) {
    const { db } = await connectToDatabase();
    const resultado = await db.collection(col).insertOne(objeto);
    if (resultado.insertedId) {
        return ("Se insertó el documento con _ID " + resultado.insertedId);
    } else {
        return "No se ha insertado ningún documento";
    }
}

//revisar
async function editar(col, query, objeto) {
    const { db } = await connectToDatabase();
    const resultado = await db.collection(col).updateOne(query, objeto);
    if (resultado.modifiedCount > 0) {
        return "El documento fue editado correctamente";
    } else {
        return "No fue modificado ningún documento";
    }
}

//revisar
async function borrar(col, query) {
    const { db } = await connectToDatabase();
    const resultado = await db.collection(col).deleteOne(query);
    if (resultado.deletedCount > 0) {
        return "El documento fue borrado";
    } else {
        return "No fue borrado ningún documento";
    }
}

async function buscarPorID(col, id) {
    const o_id = new mongo.ObjectID(id);
    const resultado = await buscar(col, { "_id": o_id });
    return resultado;
}

async function buscarPorCampo(col, nombreCampo, valorCampo) {
    const query = { [nombreCampo]: valorCampo }
    const resultado = await buscar(col, query);
    return resultado;
}

async function borrarPorID(col, id) {
    const o_id = new mongo.ObjectID(id);
    const query = { "_id": o_id };
    const resultado = await borrar(col, query);
    return resultado;
}

async function editarPorID(col, id, objeto) {
    const o_id = new mongo.ObjectID(id);
    const query = { "_id": o_id };
    const modificacion = { $set: objeto };
    const resultado = await editar(col, query, modificacion);
    return resultado;
}

async function buscarTodos() {
    return await buscar(col);
}

module.exports = { buscarPorID, borrarPorID, editarPorID, insertar, buscar, buscarPorCampo, buscarTodos }

