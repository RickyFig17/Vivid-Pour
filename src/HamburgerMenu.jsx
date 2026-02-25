import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  LogIn,
  Heart,
  BookOpen,
  LogOut,
  Trash2,
  Home,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useAuthPrompt } from "./AuthContext";
import "./HamburgerMenu.scss";
import Modal from "./Modal";

const HamburgerMenu = ({ isAppReady }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthPrompt();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowSignOutModal(false);
  };

  const handleNav = (path, mode) => {
    navigate(path, { state: { startInSignUp: mode === "signup" } });
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    console.log("Account deleted");
    await supabase.auth.signOut();
    setShowDeleteModal(false);
    setIsOpen(false);
    navigate("/");
  };

  if (!isAppReady) return null;

  return (
    <div
      className="hamburger-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="hamburger-trigger"
        onClick={toggleMenu}
        style={{ zIndex: 10005 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.1 }}
            >
              <X size={32} color="#00ced1" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.1 }}
            >
              <Menu size={32} color="#00ced1" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="dropdown-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              onClick={toggleMenu}
            />

            <motion.div
              className="menu-dropdown"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: -10,
                originX: 0,
                originY: 0,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
            >
              <div className="menu-user-header">
                {user ? (
                  <div className="profile-info">
                    <User
                      className="user-avatar"
                      name={user.user_metadata?.full_name}
                      size="48px"
                    />
                    <div className="text-group">
                      <span className="welcome">Cheers,</span>
                      <span className="user-name">
                        {user.user_metadata?.full_name || "Mixologist"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="guest-info">
                    <p>Welcome to Vivid Pour</p>
                  </div>
                )}
              </div>
              <div className="divider" />

              <div className="dropdown-links">
                <button onClick={() => handleNav("/")}>
                  <Home size={18} />
                  <span>Home</span>
                </button>

                <button onClick={() => handleNav("/history")}>
                  <BookOpen size={18} /> <span>Cocktail History</span>
                </button>

                <button onClick={() => handleNav("/favorites")}>
                  <Heart size={18} /> <span>My Favorites</span>
                </button>

                {!user && (
                  <>
                    <div className="divider" />
                    <button onClick={() => handleNav("/login", "signin")}>
                      <LogIn size={18} /> <span>Sign In</span>
                    </button>
                    <button onClick={() => handleNav("/login", "signup")}>
                      <User size={18} /> <span>Sign Up</span>
                    </button>
                  </>
                )}
              </div>

              {user && (
                <div className="dropdown-footer">
                  <div className="divider" />
                  <button
                    onClick={() => setShowSignOutModal(true)}
                    className="sign-out-btn"
                  >
                    <LogOut size={16} /> <span>Sign Out</span>
                  </button>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="delete-btn"
                  >
                    <Trash2 size={14} /> <span>Delete Account</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Modal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        title="Closing the Bar?"
        confirmText="Sign Out"
      >
        <p>
          Are you sure you want to log out? Your favorites will be waiting for
          you.
        </p>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account?"
        confirmText="Delete Everything"
        type="danger"
      >
        <p>
          This will permanently erase your bar history. This cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default HamburgerMenu;
