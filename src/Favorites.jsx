import React, { useState } from "react";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";
import "./Favorites.scss";
import Modal from "./Modal";

function Favorites({ favorites, allCocktails, onToggle, onClear }) {
  const [showClearModal, setShowClearModal] = useState(false);

  const favoriteCocktails = allCocktails.filter((cocktail) =>
    favorites.includes(cocktail.id),
  );

  return (
    <div className="category-page">
      <div className="favorites-header">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Favorites
        </motion.h2>

        {favoriteCocktails.length > 0 && (
          <div className="clear-controls">
            <button
              className="clear-all-btn"
              onClick={() => setShowClearModal(true)}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <div className="cocktail-list">
        {favoriteCocktails.length > 0 ? (
          favoriteCocktails.map((cocktail) => (
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

      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={() => {
          onClear();
          setShowClearModal(false);
        }}
        title="Empty the Bar?"
        confirmText="Clear All"
        type="danger"
      >
        <p>
          This will remove all saved cocktails from your favorites list. This
          action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

export default Favorites;
