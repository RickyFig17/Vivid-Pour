import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X, AlertTriangle } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import "./Favorites.scss";

function Favorites({ favorites, onToggle, onClear }) {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="category-page">
      <div className="favorites-header">
        <div className="favorites-header">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Favorites
          </motion.h2>

          {favorites.length > 0 && (
            <div className="clear-controls">
              <AnimatePresence mode="wait">
                {!showConfirm ? (
                  <motion.button
                    key="clear-btn"
                    className="clear-all-btn"
                    onClick={() => setShowConfirm(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Clear All
                  </motion.button>
                ) : (
                  <motion.div
                    key="confirm-wrap"
                    className="confirm-wrapper"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                    <span>Are you sure?</span>
                    <button
                      className="yes-btn"
                      onClick={() => {
                        onClear();
                        setShowConfirm(false);
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className="no-btn"
                      onClick={() => setShowConfirm(false)}
                    >
                      No
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

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
