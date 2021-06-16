const jwt = require("jsonwebtoken");

export function auth(handler) {
    return async (req, res) => {
        try {
            let token = req.headers["authorization"];
            if (!token) {
                throw new Error("no estas logueado");
            }

            token = token.replace("Bearer ", "");

            jwt.verify(token, "Secret", (err, user) => {
                if (err) {
                    throw new Error("Token invalido. Probar cerrando sesión y volviendo a loguearse");
                }
            });

            const base64Url = token.split('.')[1];
            const base64Decode = Buffer.from(base64Url, "base64");
            res.locals.datosToken = JSON.parse(base64Decode);
            return handler(req, res);
        }
        catch (e) {
            res.status(403).send(e.message);
        }
    };
}