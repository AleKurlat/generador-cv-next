export default function Principal(props) {
    const { datosPrincipal } = props;
    const arrayMapeado = datosPrincipal.map((apartado, i) => {
        return (
            <div className="card2" key={i}>
                <h2>{apartado.titulo}</h2>
                <div>
                    <h3>{apartado.subtitulo}</h3>
                    {apartado.items.map((item, j) => {
                        return (
                            <div key={j}>
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