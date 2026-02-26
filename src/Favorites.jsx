import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { Trash2 } from "lucide-react";
import "./Favorites.scss";
import Modal from "./Modal";

function Favorites({ favorites, allCocktails, onToggle, onClear, user }) {
  const [showClearModal, setShowClearModal] = useState(false);
  const navigate = useNavigate();

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

        {user && favoriteCocktails.length > 0 && (
          <div className="clear-controls">
            <button
              className="clear-all-btn"
              onClick={() => setShowClearModal(true)}
            >
              <Trash2 size={16} className="trash2" />
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
            {/* 1. Logic for Authenticated Users with empty lists */}
            {user ? (
              <>
                <p>You haven't saved any drinks yet!</p>
                <button onClick={() => navigate("/")} className="explore-btn">
                  Go Explore
                </button>
              </>
            ) : (
              /* 2. Logic for Guests (Not Signed In) */
              <>
                <p>Sign in to start saving your favorite cocktails!</p>
                <button
                  onClick={() => navigate("/login")}
                  className="explore-btn sign-in-btn"
                >
                  Sign In / Create Account
                </button>
              </>
            )}
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
