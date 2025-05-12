import TemporadaCard from "../components/TemporadaCard";

import { Row, Col } from "react-bootstrap";

import "../styles/landing.css";

import temporadas from "../constants/temporadas";

export default function Episodios() {
  return (
    <div className="layout-principal">
      <section
        id="parte-episodios-inicio"
        className="parte-episodios"
        aria-labelledby="titulo-episodios"
        role="region"
        style={{ backgroundColor: "none !important" }}
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
    </div>
  );
}
