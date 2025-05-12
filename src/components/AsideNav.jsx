import { useEffect, useState } from "react";

const secciones = [
  { id: "inicio", label: "Inicio" },
  { id: "descripcion", label: "Descripción" },
  { id: "episodios-main", label: "Episodios" },
  { id: "personajes", label: "Personajes" },
  { id: "ubicaciones", label: "Ubicaciones" },
];

function AsideNav() {
  const [seccionActiva, setSeccionActiva] = useState("");
  const [scrollingUp, setScrollingUp] = useState(false);

  // Detectar la dirección del scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const manejarScroll = () => {
      if (window.scrollY < lastScrollY) {
        setScrollingUp(true); // Se está haciendo scroll hacia arriba
      } else {
        setScrollingUp(false); // Se está haciendo scroll hacia abajo
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", manejarScroll);

    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (scrollingUp) {
            setSeccionActiva(entry.target.id);
          } else {
            setSeccionActiva(entry.target.id);
          }
        }
      });
    }, options);
    secciones.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [scrollingUp]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === "inicio") {
      const headerOffset = 120;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <aside
      className="aside-navegacion"
      aria-label="Navegación de secciones de la página"
    >
      <ul>
        {secciones.map((sec) => (
          <li key={sec.id}>
            <button
              className={seccionActiva === sec.id ? "activo" : ""}
              onClick={() => handleScrollTo(sec.id)}
              aria-current={seccionActiva === sec.id ? "true" : undefined}
              aria-label={`Ir a la sección ${sec.label}`}
            >
              {sec.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AsideNav;
