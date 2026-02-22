import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, LogIn, X } from "lucide-react";
import "./AuthModal.scss";

const AuthModal = ({ isOpen, onClose, onNavigate }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="auth-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="auth-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button className="modal-close" onClick={onClose}>
                <X size={24} />
              </button>

              <div className="modal-header">
                <div className="icon-glow">
                  <UserPlus size={40} color="#00ced1" />
                </div>
                <h2>Join the Club</h2>
                <p>
                  Save your favorite recipes and build your personal bar
                  collection.
                </p>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-primary"
                  onClick={() => onNavigate("/login", true)}
                >
                  Create Account
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => onNavigate("/login", false)}
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
