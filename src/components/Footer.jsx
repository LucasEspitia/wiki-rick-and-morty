import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/footer.css";

import rutas from "../constants/rutas";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleInicioClick = (e) => {
    e.preventDefault();
    if (location.pathname === rutas.home) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(rutas.home);
    }
  };

  return (
    <footer>
      {location.pathname !== rutas.nosotros && (
        <h1>
          <Link to={rutas.nosotros} aria-hidden="true" tabIndex={-1}>
            Sobre Nosotros?
          </Link>
        </h1>
      )}

      <div className="contenedor-footer">
        {location.pathname !== rutas.nosotros && (
          <div className="seccion-creado">
            <h3 aria-hidden={true}>Created by</h3>
            <ul role="list" aria-hidden={true}>
              <li role="listItem" aria-hidden={true}>
                Lucas Espitia
              </li>
              <li role="listItem" aria-hidden={true}>
                Ander Etxabe
              </li>
              <li role="listItem" aria-hidden={true}>
                Alberto Bellera
              </li>
              <li role="listItem" aria-hidden={true}>
                Felipe Santos
              </li>
            </ul>
          </div>
        )}

        {location.pathname !== rutas.nosotros && <hr aria-hidden={true} />}

        <div className="extras">
          {location.pathname !== rutas.nosotros && (
            <Link
              to={rutas.nosotros}
              aria-label="Ir a la seccion sobre nosotros"
            >
              Acerca de nosotros...
            </Link>
          )}

          <Link
            to={rutas.faqs}
            aria-label="Ir a la sección de preguntas frecuentes"
          >
            FAQs
          </Link>

          <Link
            to={rutas.home}
            className="btn-link"
            onClick={handleInicioClick}
            aria-label={
              location.pathname === rutas.home
                ? "Desplazarse al inicio de la página"
                : "Ir a la página principal"
            }
          >
            {location.pathname === rutas.home
              ? "Volver arriba"
              : "Ir al inicio"}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
