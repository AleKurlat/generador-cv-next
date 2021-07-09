export default function Principal(props) {
    const { datosPrincipal } = props;
    const arrayMapeado = datosPrincipal.map((apartado, i) => {
        return (
            <div className="card2" key={i}>
                <h2>{apartado.titulo}</h2>
                <div>
                    {apartado.items.map((item, j) => {
                        let zonaParrafo;
                        if (item.parrafo.toLowerCase().includes("http")) {
                            zonaParrafo = <a href={item.parrafo}>{item.parrafo}</a>
                        } else {
                            zonaParrafo = item.parrafo;
                        }
                        return (
                            <div key={j}>
                                <h3 className="mt-2">{item.encabezadoP}</h3>
                                <p className="mt-2">{zonaParrafo}</p>
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