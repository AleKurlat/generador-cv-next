export default function Header(props) {
    const { datosHeader } = props;

    return (
        <div className="header">
            <h1>{datosHeader.nombre}</h1>
            <h2>{datosHeader.descripcion}</h2>
        </div>
    )
}