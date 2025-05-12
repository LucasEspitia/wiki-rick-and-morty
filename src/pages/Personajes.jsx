import React, { useEffect, useState, useRef } from "react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import CharacterModal from "../components/CharacterModal"; // nuevo componente
import "../styles/personajes.css";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  // Refs para cada tarjeta de personaje
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        cardRefs.current = data.results.map(() => React.createRef());
      })
      .catch((error) => console.error("Error al obtener personajes:", error));
  }, [currentPage]);

  // Manejar el evento de desplazarse con flechas
  const handleKeyDown = (e, index, character) => {
    const itemsPerRow = calculateItemsPerRow();
    const lastIndex = cardRefs.current.length - 1;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        if (index < lastIndex) cardRefs.current[index + 1].current.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (index > 0) cardRefs.current[index - 1].current.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (index + itemsPerRow <= lastIndex)
          cardRefs.current[index + itemsPerRow].current.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (index - itemsPerRow >= 0)
          cardRefs.current[index - itemsPerRow].current.focus();
        break;
      case "Enter":
        e.preventDefault();
        setSelectedCharacter(character);
        break;
      default:
        break;
    }
  };

  const calculateItemsPerRow = () => {
    const container = document.querySelector(".characters-container");
    if (!container || cardRefs.current.length === 0) return 1;

    const cardWidth = cardRefs.current[0]?.current?.offsetWidth || 300;
    const containerWidth = container.offsetWidth;
    return Math.floor(containerWidth / cardWidth);
  };

  useEffect(() => {
    if (selectedCharacter) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [selectedCharacter]);

  const closeModal = () => setSelectedCharacter(null);

  return (
    <div className="personajes-section ">
      <div
        className="parte-titulo-personajes"
        aria-hidden={!!selectedCharacter}
        inert={selectedCharacter ? "true" : undefined}
      >
        <h1>Personajes</h1>
        <p style={{ fontSize: "1.25rem", letterSpacing: "0.5px" }}>
          Aquí encontrarás la información sobre todos los personajes del
          universo de Rick y Morty.
        </p>
      </div>

      <div
        className="sr-only"
        aria-live="polite"
        aria-hidden={!!selectedCharacter}
        inert={selectedCharacter ? "true" : undefined}
      >
        Estás en la sección de personajes. Usa las flechas arriba o abajo para
        moverte por los personajes. Presiona Tab para saltar a la seccion de
        paginas y poder seleccionar otras paginas.
      </div>

      <div
        className="characters-container"
        role="list"
        aria-hidden={!!selectedCharacter}
        inert={selectedCharacter ? "true" : undefined}
      >
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            ref={cardRefs.current[index]}
            tabIndex={index === 0 ? 0 : -1}
            index={index}
            onKeyDown={(e) => handleKeyDown(e, index, character)}
            onClick={setSelectedCharacter}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onKeyDown={(e) => handleKeyDown(e, index, character)}
        isModalOpen={!!selectedCharacter}
      />

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={closeModal} />
      )}
    </div>
  );
};

export default Characters;
