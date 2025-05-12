import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
function TemporadaCard({ portada, nombre, index }) {
  return (
    <Link to={`/episodios/temporada${index + 1}`} className="card-link">
      <Card
        className="temporada-card text-center w-100"
        aria-label={`Ver episodios de la  ${nombre}`}
      >
        <Card.Img
          variant="top"
          src={portada}
          alt=""
          height="400px"
          aria-hidden="true"
        />
        <Card.Body className="d-flex flex-column p-0">
          <button
            className="btn-temporada w-100 mt-auto"
            aria-hidden="true"
            tabIndex={-1}
          >
            {nombre}
          </button>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default TemporadaCard;
