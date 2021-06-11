export default function Lateral(props) {
    const { datosLateral, urlImagen } = props;
    const arrayMapeado = datosLateral.map((item, i) => {
        return (
            <div key={i}>
                <h4>{item.nombreItem}</h4>
                <p>{item.valorItem}</p>
            </div>
        )
    });

    return (
        <div className="barra-lateral">
            <div className="contenedorImagen"><img src={urlImagen} alt="Foto de CV" /></div>
            <div className="textoLateral" >
                {arrayMapeado}
            </div>
        </div>
    )
}