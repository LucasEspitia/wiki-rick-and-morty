import React, { useEffect, useState } from "react";
import LocationModal from "../components/LocationModal";
import Pagination from "../components/Pagination";
import "../styles/ubicaciones.css";

const Ubicaciones = () => {
  const [allLocations, setAllLocations] = useState([]); // Todas las ubicaciones
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(20); // Número de ubicaciones por página
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchAllLocations = async () => {
      let allData = [];
      let nextUrl = "https://rickandmortyapi.com/api/location";

      // Obtener todas las páginas de la API
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        allData = [...allData, ...data.results];
        nextUrl = data.info.next;
      }

      // Ordenar todas las ubicaciones alfabéticamente
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

  const closeModal = () => setSelectedLocation(null);

  // Calcular las ubicaciones para la página actual
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = allLocations.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );

  // Agrupar ubicaciones por la inicial de su nombre
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
        moverte por las ubicaciones. Presiona Tab para saltar a la sección de
        páginas y poder seleccionar otras páginas.
      </div>

      <div
        className="locations-container"
        role="list"
        aria-hidden={!!selectedLocation}
        inert={selectedLocation ? "true" : undefined}
      >
        {Object.keys(groupedLocations).sort().map((letter) => (
          <div key={letter} className="location-group">
            <h2 className="location-group-letter">{letter}</h2>
            <ul>
              {groupedLocations[letter].map((location) => (
                <li
                  key={location.id}
                  className="location-list-item"
                  tabIndex={0}
                  onClick={() => setSelectedLocation(location)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedLocation(location);
                  }}
                >
                  {location.name}
                </li>
              ))}
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