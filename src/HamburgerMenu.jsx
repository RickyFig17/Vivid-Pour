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
                  <hr className="divider" />

                  <button onClick={handleSignOut} className="sign-out-btn">
                    <LogOut size={16} /> <span>Sign Out</span>
                  </button>
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
