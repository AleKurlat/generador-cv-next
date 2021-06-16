export let hostAPI;
import swal from 'sweetalert';

if (process.env.NODE_ENV === 'production') {
    hostAPI = "https://api-arma-tu-cv.glitch.me/";
} else {
    hostAPI = "http://localhost:3000/api";
}

export const preLoader =
    <div className="preLoader"><img src="/loading.svg" alt="esperando" style={{ "marginLeft": "auto", "marginRight": "auto" }}></img></div>;

export function responderError(e) {
    if (e.response) {
        if (e.response.status === 403) {
            swal("No tiene permiso para realizar esta acción, o la sesión almacenada caducó. Iniciar nueva sesión");
            return 403;
        } else {
            if (e.response.data.Error) {
                swal(e.response.data.Error);
                return false;
            } else {
                swal("Status: " + e.response.status + " (" + e.response.statusText + ")");
                return false;
            }
        }
    } else {
        swal("Error en la solicitud al servidor");
        return false;
    }
}

export function obtenerDatosToken(token) {
    const base64Url = token.split('.')[1];
    const base64Decode = Buffer.from(base64Url, "base64");
    return JSON.parse(base64Decode);
}