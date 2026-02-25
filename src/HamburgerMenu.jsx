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

const HamburgerMenu = ({ isAppReady }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthPrompt();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowSignOutConfirm(false);
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
                  {!showSignOutConfirm ? (
                    <motion.button
                      key="logout-main"
                      onClick={() => setShowSignOutConfirm(true)}
                      className="sign-out-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <LogOut size={16} /> <span>Sign Out</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="logout-confirm"
                      className="confirm-logout-row"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <span>Sure?</span>
                      <button className="confirm-yes" onClick={handleSignOut}>
                        Yes
                      </button>
                      <button
                        className="confirm-no"
                        onClick={() => setShowSignOutConfirm(false)}
                      >
                        No
                      </button>
                    </motion.div>
                  )}
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
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              className="delete-modal"
              initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={{
                scale: 0.8,
                opacity: 0,
                x: "-50%",
                y: "-40%", // Slight slide down on exit
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <h3>Delete Account?</h3>
              <p>
                This will permanently erase your favorites and cocktail history.
                This action cannot be undone.
              </p>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Keep My Bar
                </button>
                <button
                  className="confirm-delete-btn"
                  onClick={handleDeleteAccount}
                >
                  Delete Everything
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
