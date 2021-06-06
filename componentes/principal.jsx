import { arrayApartados } from "../librerias/lib.jsx";

export default function Principal() {

    const arrayMapeado = arrayApartados.map(apartado => {
        return (
            <div className="card" key={apartado.id}>
                <h2>{apartado.titulo}</h2>
                <div>
                    <h3>{apartado.subtitulo}</h3>
                    {apartado.items.map(item => {
                        return (
                            <div key={item.id}>
                                <p><strong>{item.encabezadoP}</strong></p>
                                <p >{item.parrafo}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    });

    return (
        <div className="cuadroPrincipal">
            {arrayMapeado}
        </div>
    )
}