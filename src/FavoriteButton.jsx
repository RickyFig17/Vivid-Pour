import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useAuthPrompt } from "./AuthContext";
import "./FavoriteButton.scss";

const FavoriteButton = ({ cocktail, favorites, onToggle }) => {
  const { user, openAuthModal } = useAuthPrompt();
  const [isShaking, setIsShaking] = useState(false);
  const isFavorite = favorites?.includes(cocktail.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        openAuthModal();
      }, 400);

      return;
    }
    onToggle(cocktail);
  };

  return (
    <button
      onClick={handleToggle}
      className={`favorite-btn ${isFavorite ? "active" : ""} ${isShaking ? "error-shake" : ""}`}
      aria-label="Toggle Favorite"
    >
      <Heart
        size={20}
        className="heart-icon"
        fill={isFavorite ? "#ff007f" : "none"}
        color={isFavorite ? "#ff007f" : "#00ced1"}
      />
    </button>
  );
};

export default FavoriteButton;
