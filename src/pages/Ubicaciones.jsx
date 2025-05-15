import React, { useEffect, useState, useRef } from "react";
import LocationModal from "../components/LocationModal";
import Pagination from "../components/Pagination";
import "../styles/ubicaciones.css";

const Ubicaciones = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(20);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locationRefs = useRef([]);

  useEffect(() => {
    locationRefs.current = [];
  });

  useEffect(() => {
    const fetchAllLocations = async () => {
      let allData = [];
      let nextUrl = "https://rickandmortyapi.com/api/location";

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allData = [...allData, ...data.results];
        nextUrl = data.info.next;
      }

      const sortedLocations = allData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setAllLocations(sortedLocations);
    };

    fetchAllLocations().catch((error) =>
      console.error("Error al obtener ubicaciones:", error)
    );
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [selectedLocation]);

  // Foco automático en el primer ítem al cambiar de página
  useEffect(() => {
    if (locationRefs.current.length > 0) {
      locationRefs.current[0]?.focus();
    }
  }, [currentPage]);

  const closeModal = () => setSelectedLocation(null);

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = locationRefs.current[index + 1];
      if (next) next.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = locationRefs.current[index - 1];
      if (prev) prev.focus();
    } else if (e.key === "Enter") {
      setSelectedLocation(currentLocations[index]);
    }
  };

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = allLocations.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );

  const groupLocationsByLetter = () => {
    const grouped = {};
    currentLocations.forEach((location) => {
      const firstLetter = location.name[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(location);
    });
    return grouped;
  };

  const groupedLocations = groupLocationsByLetter();
  let flatIndex = -1;

  return (
    <div className="ubicaciones-section">
      <div
        className="parte-titulo-ubicaciones"
        aria-hidden={!!selectedLocation}
        inert={selectedLocation ? "true" : undefined}
      >
        <h1>Ubicaciones</h1>
        <p style={{ fontSize: "1.25rem", letterSpacing: "0.5px" }}>
          Aquí encontrarás la información sobre todas las ubicaciones del
          universo de Rick y Morty.
        </p>
      </div>

      <div
        className="sr-only"
        aria-live="polite"
        aria-hidden={!!selectedLocation}
        inert={selectedLocation ? "true" : undefined}
      >
        Estás en la sección de ubicaciones. Usa las flechas arriba o abajo para
        moverte por las ubicaciones. Presiona Tab para saltar las letras
        siguiendo el abecedario y poder seleccionar el numero de la pagina.
      </div>

      <div
        className="locations-container"
        aria-hidden={!!selectedLocation}
        inert={selectedLocation ? "true" : undefined}
      >
        {Object.keys(groupedLocations)
          .sort()
          .map((letter) => (
            <div key={letter} className="location-group">
              <h2 className="location-group-letter">{letter}</h2>
              <ul
                tabIndex={0}
                aria-label={`Ubicaciones por la letra ${letter}`}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const first = locationRefs.current[flatIndex + 1];
                    if (first) first.focus();
                  }
                }}
              >
                {groupedLocations[letter].map((location) => {
                  flatIndex++;
                  return (
                    <li
                      key={location.id}
                      className="location-list-item"
                      ref={(el) => (locationRefs.current[flatIndex] = el)}
                      onClick={() => setSelectedLocation(location)}
                      onKeyDown={(e) => handleKeyDown(e, flatIndex)}
                      role="button"
                      tabIndex={-1}
                      aria-label={`Ubicación: ${location.name}`}
                    >
                      {location.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allLocations.length / locationsPerPage)}
        onPageChange={setCurrentPage}
        isModalOpen={!!selectedLocation}
      />

      {selectedLocation && (
        <LocationModal location={selectedLocation} onClose={closeModal} />
      )}
    </div>
  );
};

export default Ubicaciones;
