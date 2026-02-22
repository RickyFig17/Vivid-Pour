import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useAuthPrompt } from "./AuthContext";
import "./FavoriteButton.scss";

const FavoriteButton = ({ cocktail, favorites, onToggle }) => {
  // We grab 'user' and 'openAuthModal' directly from our global "Brain"
  const { user, openAuthModal } = useAuthPrompt();
  const [isShaking, setIsShaking] = useState(false);

  const isFavorite = favorites?.some((fav) => fav.id === cocktail.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Check if user is logged in using the context state
    if (!user) {
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);
        openAuthModal(); // Opens the custom Vivid modal
      }, 400);

      return;
    }

    // 2. If they are logged in, run the actual toggle logic
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
        // Logic: Pink if favorite, Teal if not
        color={isFavorite ? "#ff007f" : "#00ced1"}
      />
    </button>
  );
};

export default FavoriteButton;
