import EpisodioCard from "../components/EpisodioCard";
import EpisodeModal from "../components/EpisodeModal";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import temporadas from "../constants/temporadas";

import "../styles/landing.css";
import "../styles/episodios.css";

export default function Episodios() {
  const [searchParams] = useSearchParams();

  const initialTemp = parseInt(searchParams.get("temporada")) || 1;
  const [temporada, setTemporada] = useState(initialTemp);

  const [episodios, setEpisodios] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const nuevaTemp = parseInt(searchParams.get("temporada")) || 1;
    setTemporada(nuevaTemp);
  }, [searchParams]);

  function getListaEpisodiosTemporada(temp) {
    let start = 1;
    const cantidad = temp === 1 ? 11 : 10;
    const listaEpisodios = [];

    if (temp > 1) {
      start = 11 + (temp - 2) * 10 + 1;
    }

    for (let i = 0; i < cantidad; i++) {
      listaEpisodios.push(start + i);
    }

    return listaEpisodios;
  }

  const getClaseBoton = (id) => {
    return `boton-temporada ${temporada === id ? "seleccionado" : ""}`;
  };

  const closeModal = () => setSelectedEpisode(null);

  useEffect(() => {
    let episodios = getListaEpisodiosTemporada(temporada);
    fetch(`https://rickandmortyapi.com/api/episode/${episodios}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodios(data);
      })
      .catch((error) => console.error("Error al obtener personajes:", error));
  }, [temporada]);

  return (
    <div className="temporada-container">
      <div className="parte-titulo-episodios">
        <h1>Episodios</h1>
        <p style={{ fontSize: "1.25rem", letterSpacing: "0.5px" }}>
          Aquí encontrarás información sobre los episodios de las primeras cinco
          temporadas de Rick y Morty.
        </p>
      </div>

      <div
        className="selector-temporada"
        role="group"
        aria-label="Selector de temporada"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={getClaseBoton(num)}
            onClick={() => setTemporada(num)}
            aria-pressed={temporada === num}
          >
            Temporada {num}
          </button>
        ))}
      </div>

      <div className="episodios-layout">
        <div className="imagen-temporada">
          <img
            src={temporadas[temporada - 1].portada}
            alt={`Temporada ${temporada}`}
            aria-hidden="true"
          />
        </div>

        <div className="episodios-container">
          {episodios.map((episodio, index) => (
            <EpisodioCard
              key={episodio.id}
              className="episodio-list-item"
              index={index}
              episodio={episodio}
              onClick={setSelectedEpisode}
            />
          ))}
          {selectedEpisode && (
            <EpisodeModal episodio={selectedEpisode} onClose={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
}
