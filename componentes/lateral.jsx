export default function Lateral(props) {
    const { datosLateral, urlImagen } = props;
    const arrayMapeado = datosLateral.map((item, i) => {
        let zonaValor;
        if (item.valorItem.toLowerCase().includes("http")) {
            zonaValor = <a href={item.valorItem}>{item.valorItem}</a>
        } else {
            zonaValor = item.valorItem;
        }
        return (
            <div key={i}>
                <h4>{item.nombreItem}</h4>
                <p>{zonaValor}</p>
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