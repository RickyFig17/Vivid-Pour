import React from "react";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";
import "./Favorites.scss";

function Favorites({ favorites, onToggle }) {
  return (
    <div className="category-page">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Favorites
      </motion.h2>

      <div className="cocktail-list">
        {favorites && favorites.length > 0 ? (
          favorites.map((cocktail) => (
            <motion.div key={cocktail.id} className="cocktail-card" layout>
              <div className="list-thumbnail">
                <img src={cocktail.image} alt={cocktail.name} />
              </div>

              <h3>{cocktail.name}</h3>

              <div className="card-fav-container">
                <FavoriteButton
                  cocktail={cocktail}
                  favorites={favorites}
                  onToggle={onToggle}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-favs">
            <p>You haven't saved any drinks yet!</p>
            <button
              onClick={() => window.history.back()}
              className="explore-btn"
            >
              Go Explore
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
