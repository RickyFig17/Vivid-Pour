import React from "react";
import { Heart } from "lucide-react";
import "./FavoriteButton.scss";

const FavoriteButton = ({ cocktail, favorites, onToggle }) => {
  const isFavorite = favorites?.some((fav) => fav.id === cocktail.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(cocktail);
  };

  return (
    <button
      onClick={handleToggle}
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
      aria-label="Toggle Favorite"
    >
      <Heart
        size={20}
        className="heart-icon"
        fill={isFavorite ? "#ff007f" : "none"}
      />
    </button>
  );
};

export default FavoriteButton;
