import React, { useEffect, useState, useRef } from "react";
import "../styles/characterModal.css";

const CharacterModal = ({ character, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState(false);
  const modalRef = useRef();
  const closeButtonRef = useRef();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    modalRef.current?.focus();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Detecta cuándo se enfoca el botón de cerrar
  useEffect(() => {
    const handleFocus = () => {
      setIsCloseButtonFocused(
        document.activeElement === closeButtonRef.current
      );
    };

    window.addEventListener("focusin", handleFocus);
    return () => {
      window.removeEventListener("focusin", handleFocus);
    };
  }, []);

  // Permitir cerrar con ESC y bloquear flechas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  // Contener el tab, aunque con flechas si se sale del focus (Modo narrador), Para que cierre el personaje
  const handleTabKey = (e) => {
    if (e.key !== "Tab") return;

    const focusableEls = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  return (
    <div className="personaje-modal-overlay" onClick={handleClose}>
      <div
        className={`personaje-modal-content horizontal ${
          isVisible ? "open" : "closing"
        }`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
        onKeyDown={handleTabKey}
      >
        <button
          className="personaje-close-button"
          onClick={handleClose}
          ref={closeButtonRef}
          aria-hidden={!isCloseButtonFocused}
          aria-label={isCloseButtonFocused ? "Cerrar Personaje" : undefined}
        >
          X
        </button>

        <div className="personaje-modal-image">
          <img src={character.image} alt={character.name} aria-hidden="true" />
        </div>

        <div className="personaje-modal-details">
          <h2 className="personaje-modal-name">{character.name}</h2>
          <p>
            <span className="personaje-modal-label">Estado:</span>{" "}
            <span className="personaje-modal-value">{character.status}</span>
          </p>
          <p>
            <span className="personaje-modal-label">Especie:</span>{" "}
            <span className="personaje-modal-value">{character.species}</span>
          </p>
          <p>
            <span className="personaje-modal-label">Género:</span>{" "}
            <span className="personaje-modal-value">{character.gender}</span>
          </p>
          <p>
            <span className="personaje-modal-label">Origen:</span>{" "}
            <span className="personaje-modal-value">
              {character.origin.name}
            </span>
          </p>
          <p>
            <span className="personaje-modal-label">
              Primer episodio en el que aparece:
            </span>{" "}
            <span className="personaje-modal-value">
              Episodio {character.episode[0].substring(40)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
