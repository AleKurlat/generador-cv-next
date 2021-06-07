export default function Principal(props) {
    const { datosPrincipal } = props;
    const arrayMapeado = datosPrincipal.map(apartado => {
        return (
            <div className="card2" key={apartado.id}>
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