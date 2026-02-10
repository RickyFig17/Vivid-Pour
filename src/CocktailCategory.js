import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cocktailData from "./Cocktails.json";
import "./CocktailCategory.scss";

function CocktailCategory({ type, title, searchTerm }) {
  const [selectedCocktail, setSelectedCocktail] = useState(null);

  const filteredDrinks = cocktailData
    .filter((drink) => {
      if (type === "all") return true;
      return drink.type === type;
    })
    .filter((drink) =>
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="category-page">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {title}
      </motion.h2>

      <div className="cocktail-list">
        {filteredDrinks.length > 0 ? (
          filteredDrinks.map((cocktail) => (
            <motion.div
              key={cocktail.id}
              className="cocktail-card"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px rgba(138, 43, 226, 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCocktail(cocktail)}
            >
              <div className="list-thumbnail">
                <img src={cocktail.image} alt={cocktail.name} />
              </div>
              <h3>{cocktail.name}</h3>
            </motion.div>
          ))
        ) : (
          <p className="no-results">No drinks found for "{searchTerm}"</p>
        )}
      </div>

      <AnimatePresence>
        {selectedCocktail && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCocktail(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <button
                  className="close-x"
                  onClick={() => setSelectedCocktail(null)}
                >
                  ×
                </button>
                <img
                  src={selectedCocktail.image}
                  alt={selectedCocktail.name}
                  className="modal-cocktail-img"
                />
                <h2>{selectedCocktail.name}</h2>
              </div>

              <div className="modal-grid">
                <div className="recipe-section">
                  <h4>Ingredients</h4>
                  <ul>
                    {selectedCocktail.alcohol &&
                      selectedCocktail.alcohol !== "N/A" && (
                        <li>
                          <strong>Base:</strong> {selectedCocktail.alcohol}
                        </li>
                      )}
                    {selectedCocktail.alcohol1 &&
                      selectedCocktail.alcohol1 !== "N/A" && (
                        <li>
                          <strong>Base 1:</strong> {selectedCocktail.alcohol1}
                        </li>
                      )}
                    {selectedCocktail.alcohol2 &&
                      selectedCocktail.alcohol2 !== "N/A" && (
                        <li>
                          <strong>Base 2:</strong> {selectedCocktail.alcohol2}
                        </li>
                      )}
                    {selectedCocktail.alcohol3 &&
                      selectedCocktail.alcohol3 !== "N/A" && (
                        <li>
                          <strong>Base 3:</strong> {selectedCocktail.alcohol3}
                        </li>
                      )}
                    {selectedCocktail.alcohol4 &&
                      selectedCocktail.alcohol4 !== "N/A" && (
                        <li>
                          <strong>Base4 :</strong> {selectedCocktail.alcohol4}
                        </li>
                      )}
                    {selectedCocktail.alcohol5 &&
                      selectedCocktail.alcohol5 !== "N/A" && (
                        <li>
                          <strong>Base 5:</strong> {selectedCocktail.alcohol5}
                        </li>
                      )}
                    {selectedCocktail.filler &&
                      selectedCocktail.filler !== "N/A" && (
                        <li>
                          <strong>Mixer:</strong> {selectedCocktail.filler}
                        </li>
                      )}
                    {selectedCocktail.filler1 &&
                      selectedCocktail.filler1 !== "N/A" && (
                        <li>
                          <strong>Mixer 1:</strong> {selectedCocktail.filler1}
                        </li>
                      )}
                    {selectedCocktail.filler2 &&
                      selectedCocktail.filler2 !== "N/A" && (
                        <li>
                          <strong>Mixer 2:</strong> {selectedCocktail.filler2}
                        </li>
                      )}
                    {selectedCocktail.filler3 &&
                      selectedCocktail.filler3 !== "N/A" && (
                        <li>
                          <strong>Mixer 3:</strong> {selectedCocktail.filler3}
                        </li>
                      )}
                      {selectedCocktail.top &&
                      selectedCocktail.top !== "N/A" && (
                        <li>
                          <strong>Top:</strong> {selectedCocktail.top}
                        </li>
                      )}
                  </ul>
                </div>

                <div className="method-section">
                  <h4>Method</h4>
                  <p>
                    <strong>Glass:</strong> {selectedCocktail.glass}
                  </p>
                  <p>
                    <strong>Build:</strong> {selectedCocktail.mixingMethod}
                  </p>
                  <p>
                    <strong>Garnish:</strong> {selectedCocktail.garnish}
                  </p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setSelectedCocktail(null)}
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CocktailCategory;
