import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import poligono from "../assets/elementos/Polygon.svg";

import "../styles/header.css";

import rutas from "../constants/rutas";

function NavBar() {
  /* Varibales usando useState, useRef para renderizar mejor el nav */
  const MOBILE_BREAKPOINT = 800;
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [mostrarTemporadas, setMostrarTemporadas] = useState(false);

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  /* Detectar si la pantalla es mobil */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Detectar si se hace click fuera del menú cuando esté abierto */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && menuAbierto) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          toggleButtonRef.current &&
          !toggleButtonRef.current.contains(event.target)
        ) {
          closeMenu();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, menuAbierto]);

  /* Al abrir el menu hamburguesa con Tab, se pone en el primer Link */
  useEffect(() => {
    if (isMobile && menuAbierto && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [menuAbierto, isMobile]);

  /* Cerrar el menu Hamburguesa con ESC */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* Cerrar y abrir el menu hamburguesa */
  const closeMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Menú principal">
      {isMobile && (
        <button
          ref={toggleButtonRef}
          className="menu-toggle"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuAbierto((prev) => !prev)}
        >
          ☰
        </button>
      )}
      <ul
        ref={menuRef}
        id="menu-principal"
        className={menuAbierto || !isMobile ? "show" : ""}
        role="menu"
        aria-hidden={isMobile ? !menuAbierto : false}
      >
        <li role="none">
          <Link
            ref={firstLinkRef}
            to={rutas.home}
            onClick={closeMenu}
            role="menuitem"
            tabIndex={isMobile && !menuAbierto ? -1 : 0}
          >
            Menu principal
          </Link>
        </li>
        <li role="none">
          <Link
            to={rutas.personajes}
            onClick={closeMenu}
            role="menuitem"
            tabIndex={isMobile && !menuAbierto ? -1 : 0}
          >
            Personajes
          </Link>
        </li>
        <li role="none">
          <Link
            to={rutas.ubicaciones}
            onClick={closeMenu}
            role="menuitem"
            tabIndex={isMobile && !menuAbierto ? -1 : 0}
          >
            Ubicaciones
          </Link>
        </li>
        <li
          className="submenu"
          onMouseEnter={() => setMostrarTemporadas(true)}
          onMouseLeave={() => setMostrarTemporadas(false)}
          id="episodios"
          role="none"
        >
          <Link
            to={rutas.episodios}
            onClick={closeMenu}
            role="menuitem"
            tabIndex={isMobile && !menuAbierto ? -1 : 0}
          >
            Episodios{" "}
            <img src={poligono} height="10px" alt="" aria-hidden="true" />
          </Link>

          {mostrarTemporadas && (
            <ul className="dropdown">
              <li>
                <Link to={`${rutas.episodios}/temporada1`}> Temporada 1</Link>
              </li>
              <li>
                <Link to={`${rutas.episodios}/temporada2`}> Temporada 2</Link>
              </li>
              <li>
                <Link to={`${rutas.episodios}/temporada3`}> Temporada 3</Link>
              </li>
              <li>
                <Link to={`${rutas.episodios}/temporada4`}> Temporada 4</Link>
              </li>
              <li>
                <Link to={`${rutas.episodios}/temporada5`}> Temporada 5</Link>
              </li>
            </ul>
          )}
        </li>

        <li role="none">
          <Link
            to={rutas.nosotros}
            onClick={closeMenu}
            role="menuitem"
            tabIndex={isMobile && !menuAbierto ? -1 : 0}
          >
            Nosotros
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
