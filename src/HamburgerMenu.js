import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./HamburgerMenu.scss";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. THE TRIGGER ICON */}
      <button className="hamburger-trigger" onClick={toggleMenu}>
        <Menu size={32} color={isOpen ? "transparent" : "#00ced1"} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 2. THE DARK BACKDROP */}
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* 3. THE SLIDE-OUT DRAWER */}
            <motion.div
              className="menu-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                <h2 className="vivid-logo">VIVID</h2>
                <button onClick={toggleMenu} className="close-btn">
                  <X size={28} />
                </button>
              </div>

              <div className="drawer-links">
                <button onClick={() => handleNav("/login")}>
                  <LogIn size={20} /> <span>Sign In</span>
                </button>
                <button onClick={() => handleNav("/signup")}>
                  <User size={20} /> <span>Create Account</span>
                </button>
                <hr className="divider" />
                <button onClick={() => handleNav("/favorites")}>
                  <Heart size={20} /> <span>My Favorites</span>
                </button>
                <button onClick={() => handleNav("/settings")}>
                  <Settings size={20} /> <span>Settings</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
