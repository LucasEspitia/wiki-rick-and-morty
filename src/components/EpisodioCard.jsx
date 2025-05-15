import "../styles/episodioCard.css";

export default function EpisodioCard(props) {
  const { index, episodio, onClick } = props;

  return (
    <div
      className="episodio-card"
      onClick={() => onClick?.(episodio)}
      role="button"
      tabIndex={0}
      aria-label={`Episodio ${index + 1}: ${episodio.name}`}
    >
      <h3>
        {index + 1}. {episodio.name}
      </h3>
    </div>
  );
}
