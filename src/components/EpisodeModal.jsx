import { useEffect, useState, useRef, useCallback } from "react";
import "../styles/episodioModal.css";

const EpisodeModal = ({ episodio, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [verPersonajes, setVerPersonajes] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await Promise.all(
          episodio.characters.map((url) => fetch(url).then((res) => res.json()))
        );
        setEpisodeCharacters(characters);
      } catch (error) {
        console.error("Error al cargar personajes del episodio", error);
      }
    };

    fetchCharacters();

    setTimeout(() => setIsVisible(true), 10);
    modalRef.current?.focus();
  }, [episodio.characters]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleVerPersonajes = () => {
    setVerPersonajes(!verPersonajes);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div className="episodio-modal-overlay" onClick={handleClose}>
      <div
        className={`episodio-modal-content ${isVisible ? "open" : "closing"}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <button className="episodio-close-button" onClick={handleClose}>
          X
        </button>
        <h2 className="episodio-modal-name">{episodio.name}</h2>
        <p>
          <span className="episodio-modal-label">Episodio:</span>{" "}
          <span className="episodio-modal-value">{episodio.episode}</span>
        </p>
        <p>
          <span className="episodio-modal-label">
            Número de capítulo de la serie:
          </span>{" "}
          <span className="episodio-modal-value">{episodio.id}</span>
        </p>
        <p>
          <span className="episodio-modal-label">Fecha de emisión:</span>{" "}
          <span className="episodio-modal-value">{episodio.air_date}</span>
        </p>
        <p>
          <span
            className="episodio-modal-label boton-personajes"
            onClick={handleVerPersonajes}
          >
            Personajes que aparecen
          </span>{" "}
        </p>
        {verPersonajes && (
          <div className="container-characters">
            {episodeCharacters.map((character) => (
              <div key={character.id} className="character-wrapper">
                <img
                  className="episode-modal-character"
                  src={character.image}
                  alt={character.name}
                  height={"80px"}
                />
                <div>{character.name}</div> {/* o cualquier otro contenido */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeModal;
