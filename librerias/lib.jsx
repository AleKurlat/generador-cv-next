export let hostAPI;
import swal from 'sweetalert';

if (process.env.NODE_ENV === 'production') {
    hostAPI = "";
} else {
    hostAPI = "http://localhost:3001";
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

export const dataHeader = {
    nombre: "Cv de Persona X",
    descripcion: "Tareas múltiples"
}

export const urlImagen = "https://static.wikia.nocookie.net/fallout/images/c/c0/VaultBoyFO3.png";

export const arrayLateral = [
    {
        id: 0,
        nombreItem: "Email",
        valorItem: "PersonaX@gmail.com"
    },
    {
        id: 1,
        nombreItem: "Teléfono",
        valorItem: "0000-0000"
    }
]

export const arrayApartados = [
    {
        id: 0, titulo: "Experiencia laboral", subtitulo: "Rubros varios", items: [
            {
                id: 0,
                encabezadoP: "Gastronomía",
                parrafo: "Trabajo en bares"
            },
            {
                id: 1,
                parrafo: "2014-2019",
            },
        ]
    },
    {
        id: 1, titulo: "Educación secundaria", subtitulo: "Bachiller", items: [
            {
                id: 0,
                encabezadoP: "Colegio de mi barrio",
                parrafo: "2010-2014"
            },
            {
                id: 1,
                parrafo: "Promedio 7",
            },
        ]
    },
]