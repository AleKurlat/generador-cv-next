async function handler(req, res) {
    try {
        res.send("Funciono bien");
    }
    catch (e) {
        if (res.statusCode === 200) { res.statusCode = 500 };
        res.send({ "Error": e.message });
    }
}

export default handler;