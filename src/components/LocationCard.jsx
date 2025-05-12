import React, { forwardRef } from "react";
import "../styles/locationCard.css";

const LocationCard = forwardRef(
  ({ location, tabIndex, onKeyDown, onClick, index }, ref) => {
    const handleKey = (e) => {
      if (onKeyDown) onKeyDown(e, index);
    };

    return (
      <div
        className="location-card"
        role="listitem"
        tabIndex={tabIndex}
        ref={ref}
        onKeyDown={handleKey}
        onClick={() => onClick?.(location)}
      >
        <h3>{location.name}</h3>
        <p>{location.type}</p>
      </div>
    );
  }
);

export default LocationCard;