import AutorCard from "../components/AutorCard";

import fotoLucas from "../assets/autores/foto_Lucas.jpg";
import fotoAnder from "../assets/autores/foto_Ander.jpg";
import fotoAlberto from "../assets/autores/foto_Alberto.jpg";
import fotoFelipe from "../assets/autores/foto_Felipe.png";

import { Row, Col } from "react-bootstrap";

import "../styles/nosotros.css";

function Nosotros() {
  const autores = [
    {
      nombre: "Lucas Espitia",
      foto: fotoLucas,
      bio: "Codifico, luego existo... o al menos lo intento",
    },

    {
      nombre: "Ander Etxabe",
      foto: fotoAnder,
      bio: "Rick y morty >> Los Simpson",
    },

    {
      nombre: "Alberto Bellera",
      foto: fotoAlberto,
      bio: "",
    },

    {
      nombre: "Felipe Santos",
      foto: fotoFelipe,
      bio: "Web developer, cineasta enjoer",
    },
  ];

  return (
    <div className="layout-principal">
      <section
        id="autores"
        className="parte-autores"
        aria-labelledby="titulo-autores"
      >
        <h1 id="titulo-autores">Conócenos</h1>
        <br aria-hidden={true} />
        <Row className="justify-content-center">
          {autores.map((a, i) => (
            <Col
              key={i}
              md={6}
              lg={6}
              xl={3}
              className="autor-col d-flex justify-content-center"
            >
              <AutorCard nombre={a.nombre} foto={a.foto} bio={a.bio} />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}

export default Nosotros;
