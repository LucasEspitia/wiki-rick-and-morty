import React, { forwardRef } from "react";
import "../styles/characterCard.css";

const CharacterCard = forwardRef(
  ({ character, tabIndex, onKeyDown, onClick, index }, ref) => {
    const handleKey = (e) => {
      if (onKeyDown) onKeyDown(e, index);
    };

    return (
      <div
        className="character-card"
        role="listitem"
        tabIndex={tabIndex}
        ref={ref}
        onKeyDown={handleKey}
        onClick={() => onClick?.(character)}
      >
        <img src={character.image} alt={character.name} aria-hidden="true" />
        <h3>{character.name}</h3>
      </div>
    );
  }
);

export default CharacterCard;
