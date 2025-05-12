import { Card } from "react-bootstrap";

function AutorCard(props) {
  const { nombre, foto, bio } = props;

  return (
    <Card
      className="autor-card text-center"
      role="group"
      aria-label={`Autor: ${nombre}. ${
        bio ? `Biografía: ${bio}` : "Sin biografía disponible"
      }`}
      tabIndex={0}
    >
      <Card.Img
        variant="top"
        src={foto}
        alt={`Foto de ${nombre}`}
        className="autor-img"
        aria-hidden="true"
      />
      <Card.Body>
        <Card.Title className="contenedor-titulo" aria-hidden="true">
          <span>{nombre}</span>
        </Card.Title>
        <Card.Text aria-hidden="true">- "{bio}"</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AutorCard;
