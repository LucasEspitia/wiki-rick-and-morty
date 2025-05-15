import FormularioContacto from "../components/FormularioContacto";

import "../styles/landing.css";
import "../styles/contacto.css";

function Contacto() {
  return (
    <div className="contacto-container">
      <div className="titulo-contacto">
        <h1>Contacto</h1>
        <p style={{ fontSize: "1.25rem", letterSpacing: "0.5px" }}>
          Si tienes alguna sugerencia y quieres hacérnosla saber, rellena el
          formulario de abajo y nos pondremos en contacto contigo!
        </p>
      </div>
      <div className="form-contacto-container">
        <FormularioContacto />
      </div>
    </div>
  );
}

export default Contacto;
