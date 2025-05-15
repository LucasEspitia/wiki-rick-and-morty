import AutorCard from "../components/AutorCard";

import { Row, Col } from "react-bootstrap";

import autores from "../constants/autores";

function Nosotros() {
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
              <AutorCard
                nombre={a.nombre}
                foto={a.foto}
                bio={a.bio}
                githubUser={a.githubUser}
              />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}

export default Nosotros;
