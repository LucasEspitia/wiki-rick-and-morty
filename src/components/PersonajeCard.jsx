import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";

function PersonajeCard({ personajeId }) {
  const [personaje, setPersonaje] = useState(null);

  useEffect(() => {
    const fetchPersonaje = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${personajeId}`
      );
      const data = await response.json();
      setPersonaje(data);
    };

    fetchPersonaje();
  }, [personajeId]);

  if (!personaje) {
    return <div>Cargando...</div>;
  }

  return (
    <Card
      className={`personaje-card ${
        personaje.status === "Alive"
          ? "box-alive"
          : personaje.status === "Dead"
          ? "box-dead"
          : "box-unknown"
      } mb-4`}
      aria-label={`Personaje ${personaje.name}. Estado: ${personaje.status}, especie: ${personaje.species}, origen: ${personaje.origin.name}, última ubicación: ${personaje.location.name}`}
      tabIndex={0}
    >
      <div className="d-flex">
        <Card.Img
          variant="left"
          src={personaje.image}
          alt=""
          aria-hidden="true"
          style={{
            width: "230px",
            height: "220px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <Card.Body
          className="d-flex flex-column justify-content-center"
          style={{ flex: 1 }}
        >
          <Card.Title className="contenedor-titulo">
            <span id="nombrePersonaje">{personaje.name}</span>
          </Card.Title>
          <Card.Text>
            <span
              className={`status-indicator ${
                personaje.status === "Alive"
                  ? "status-alive"
                  : personaje.status === "Dead"
                  ? "status-dead"
                  : "status-unknown"
              }`}
              aria-hidden="true"
            ></span>
            {personaje.status} - {personaje.species}
          </Card.Text>
          <Card.Subtitle className="subtitulos">Origen:</Card.Subtitle>
          <Card.Text>{personaje.origin.name}</Card.Text>
          <Card.Subtitle className="subtitulos">
            Última ubicación conocida:
          </Card.Subtitle>
          <Card.Text>{personaje.location.name}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}

export default PersonajeCard;
