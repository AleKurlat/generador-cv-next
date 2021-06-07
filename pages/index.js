import Head from 'next/head';
import Header from "../componentes/header";
import Lateral from "../componentes/lateral";
import Principal from "../componentes/principal";

export default function Home(props) {
  const { datosHeader, urlImagen, datosLateral, datosPrincipal } = props;

  return (
    <div className="contenedor">
      <Head>
        <title>Creá tu CV</title>
        <meta name="description" content="App para generar tu Curriculum Vitae" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header datosHeader={datosHeader} />
      <div className="cuerpo">
        <Lateral datosLateral={datosLateral} urlImagen={urlImagen} />
        <Principal datosPrincipal={datosPrincipal} />
      </div>
    </div>
  )
}
