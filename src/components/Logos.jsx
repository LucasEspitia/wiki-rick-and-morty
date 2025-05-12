import logoRickYMorty from "../assets/logos/logo_rickYMorty.png";
import logoAS from "../assets/logos/logo_adult_swim.png";

import "../styles/header.css";

function Logos() {
  return (
    <div
      className="Logos"
      tabIndex="0"
      aria-label="Wikipedia Fandom de Rick y Morty"
    >
      <img
        src={logoRickYMorty}
        alt="Logo Rick y Morty"
        height="60"
        aria-hidden="true"
      ></img>
      <img
        src={logoAS}
        alt="Logo Adult Swim"
        width="220px"
        height="60"
        aria-hidden="true"
      ></img>
    </div>
  );
}
export default Logos;
