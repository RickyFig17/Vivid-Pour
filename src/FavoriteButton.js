import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthPrompt } from "./AuthContext";
import "./FavoriteButton.scss";

const FavoriteButton = ({ cocktail, favorites, onToggle }) => {
  const navigate = useNavigate();
  const { openAuthModal } = useAuthPrompt();
  const [isShaking, setIsShaking] = useState(false);
  const isFavorite = favorites?.some((fav) => fav.id === cocktail.id);
  const isLoggedIn = false;

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);

        const wantToJoin = openAuthModal(
          "Want to save your favorite drinks? Sign up for a Vivid Pour account!",
        );

        if (wantToJoin) {
          navigate("/login", { state: { startInSignUp: true } });
        }
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
