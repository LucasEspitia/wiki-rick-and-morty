import React, { useEffect, useState, useRef } from "react";
import "../styles/locationModal.css";

const LocationModal = ({ location, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
    modalRef.current?.focus();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Permitir cerrar con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="location-modal-overlay" onClick={handleClose}>
      <div
        className={`location-modal-content ${isVisible ? "open" : "closing"}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <button className="location-close-button" onClick={handleClose}>
          X
        </button>

        <h2 className="location-modal-name">{location.name}</h2>
        <p>
          <span className="location-modal-label">Tipo:</span>{" "}
          <span className="location-modal-value">{location.type}</span>
        </p>
        <p>
          <span className="location-modal-label">Dimension:</span>{" "}
          <span className="location-modal-value">{location.dimension}</span>
        </p>
        <p>
          <span className="location-modal-label">Población:</span>{" "}
          <span className="location-modal-value">{location.residents.length}</span>
        </p>
      </div>
    </div>
  );
};

export default LocationModal;