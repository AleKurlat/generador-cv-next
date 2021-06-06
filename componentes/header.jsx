import { dataHeader } from "../librerias/lib.jsx";

export default function Header() {
    return (
        <div className="header">
            <h1>{dataHeader.nombre}</h1>
            <h2>{dataHeader.descripcion}</h2>
        </div>
    )
}