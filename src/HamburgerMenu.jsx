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

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthPrompt();

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

  return (
    <div className="hamburger-container">
      <button className="hamburger-trigger" onClick={toggleMenu}>
        {isOpen ? (
          <X size={32} color="#00ced1" />
        ) : (
          <Menu size={32} color="#00ced1" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="dropdown-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="menu-user-header">
                {user ? (
                  <div className="profile-info">
                    <User className="user-avatar" name={user.user_metadata?.full_name} size="48px" />
                    <div className="text-group">
                      <span className="welcome">Cheers,</span>
                      <span className="user-name">
                        {user.user_metadata?.full_name || "Mixologist"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="guest-info">
                    <p>Welcome to Vivid</p>
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
                    <hr className="divider" />
                    <button onClick={() => handleNav("/login", "signin")}>
                      <LogIn size={18} /> <span>Sign In</span>
                    </button>
                    <button onClick={() => handleNav("/login", "signup")}>
                      <User size={18} /> <span>Join the Club</span>
                    </button>
                  </>
                )}
              </div>

              {user && (
                <div className="dropdown-footer">
                  <div className="divider" />

                  <AnimatePresence mode="wait">
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
                  </AnimatePresence>

                  <button onClick={() => {}} className="delete-btn">
                    <Trash2 size={14} /> <span>Delete Account</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
