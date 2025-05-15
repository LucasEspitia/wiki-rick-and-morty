import videoFondoPrincipal from "../assets/fondos/fondo_en_movimiento_ufo.mp4";
import videoPortal from "../assets/fondos/saliendo_portal_rickyMorty.gif";

import TemporadaCard from "../components/TemporadaCard";
import AsideNav from "../components/AsideNav";
import PersonajeCard from "../components/PersonajeCard";

import { Row, Col, Image, Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/landing.css";

/* Variables que contiene la temporada y la imagen de la caratula de la Temporada */
import temporadas from "../constants/temporadas";

function Home() {
  /* Referencia para hacer el evento de explorar mas al inicio de la landing*/

  const descripcionRef = useRef(null);

  function desplazarHaciaDescripcion() {
    if (descripcionRef.current) {
      descripcionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  /* Parte encargada de ocultar o mostrar el aside nav */
  const [mostrarAside, setMostrarAside] = useState(true);
  const [indicesApiPersonajes, setIndicesApiPersonajes] = useState([]);

  useEffect(() => {
    /* Seccion encargada de renderizar los personajes mostrados de la API en la landing page  */
    const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const random1 = getRandomNumber(3, 826);
    let random2 = getRandomNumber(3, 826);
    while (random2 === random1) {
      random2 = getRandomNumber(3, 826);
    }

    setIndicesApiPersonajes([1, 2, random1, random2]);

    /* Seccion encargada de renderizar la visibilidad del Aside y hacerlo Responsive  */
    const actualizarVisibilidad = () => {
      setMostrarAside(window.innerWidth > 949);
    };

    actualizarVisibilidad(); // Verifica al montar
    window.addEventListener("resize", actualizarVisibilidad);

    return () => window.removeEventListener("resize", actualizarVisibilidad);
  }, []);

  return (
    <div className="layout-principal">
      {mostrarAside && <AsideNav />}
      {/* Sección de inicio con video de fondo */}
      <section
        id="inicio"
        className="parte-principal"
        aria-labelledby="titulo-inicio"
        tabIndex="0"
        role="region"
      >
        <h2 id="titulo-inicio" className="visually-hidden">
          Inicio - Video de Rick y Morty escapando en su nave de un portal.
        </h2>

        <div className="video-contenedor">
          <video
            autoPlay
            muted
            loop
            className="background-video"
            aria-hidden="true"
          >
            <source src={videoFondoPrincipal} type="video/mp4" />
          </video>
        </div>

        <div className="video-overlay">
          <button
            onClick={desplazarHaciaDescripcion}
            aria-label="Explorar el sitio, ir a la descripción"
          >
            Explóranos
          </button>
        </div>
      </section>

      {/* Sección de descripción principal */}
      <section
        id="descripcion"
        className="parte-descriptiva"
        ref={descripcionRef}
        aria-labelledby="titulo-descripcion"
        role="region"
      >
        <h1 id="titulo-descripcion">Bienvenid@ a la Wiki de Rick y Morty</h1>
        <p>
          Diviértete obteniendo conocimiento sobre la serie Rick y Morty,
          explora episodios, localizaciones, personajes y más.
        </p>
      </section>

      <section
        id="episodios-main"
        className="parte-episodios"
        aria-labelledby="titulo-episodios"
        role="region"
      >
        <h1 id="titulo-episodios">Episodios</h1>
        <Row className="justify-content-center">
          {temporadas.map((t, i) => (
            <Col
              key={i}
              xs={12}
              sm={6}
              md={4}
              className="d-flex justify-content-center mb-4"
            >
              <TemporadaCard nombre={t.nombre} portada={t.portada} index={i} />
            </Col>
          ))}
        </Row>
      </section>

      <section
        id="personajes"
        className="parte-personajes"
        aria-labelledby="titulo-personajes"
        role="region"
      >
        <h1 id="titulo-personajes">Personajes</h1>

        <Row className="justify-content-center">
          {indicesApiPersonajes.map((id) => (
            <Col
              key={id}
              md={12}
              lg={12}
              xl={6}
              className="d-flex justify-content-center mb-4"
            >
              <PersonajeCard key={id} personajeId={id} />
            </Col>
          ))}
        </Row>
        <Link
          className="btn-personajes "
          to="/personajes"
          aria-label="Explora más personajes de Rick y Morty"
        >
          <button tabIndex={-1} aria-hidden="true">
            Explora más...
          </button>
        </Link>
      </section>

      <section
        id="ubicaciones"
        className="parte-ubicaciones"
        aria-labelledby="titulo-ubicaciones"
        role="region"
      >
        <h1 id="titulo-ubicaciones">Ubicaciones</h1>
        <div className="seccion-interna-ubicaciones">
          <Image
            src={videoPortal}
            alt="Animación mostrando el efecto de un portal dimensional"
          />
          <p
            aria-label=" Es un Rickynmenso universo, explora más para saber sobre las ubicaciones!"
            tabIndex={0}
          >
            Es un Rickynmenso universo,{" "}
            <Link to="/ubicaciones" aria-label="Ver más sobre ubicaciones">
              explora más
            </Link>{" "}
            para saber sobre las ubicaciones!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
