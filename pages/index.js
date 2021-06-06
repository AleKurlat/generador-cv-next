import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import Header from "../componentes/header";
import Lateral from "../componentes/lateral";
import Principal from "../componentes/principal";

export default function Home() {
  return (
    <div className="contenedor">
      <Head>
        <title>Creá tu CV</title>
        <meta name="description" content="App para generar tu Curriculum Vitae" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="cuerpo">
        <Lateral />
        <Principal />
      </div>
    </div>
  )
}
