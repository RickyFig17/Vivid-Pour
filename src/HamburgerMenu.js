import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn, Heart, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import UserAvatar from "./UserAvatar";
import "./HamburgerMenu.scss";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNav = (path, mode) => {
    navigate(path, { state: { startInSignUp: mode === "signup" } });
    setIsOpen(false);
  };

  useEffect(() => {
    // 1. Get the current user session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for login/logout events to update the UI in real-time
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <button className="hamburger-trigger" onClick={toggleMenu}>
        <Menu size={32} color={isOpen ? "transparent" : "#00ced1"} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            <motion.div
              className="menu-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="drawer-header">
                {user ? (
                  <div className="user-section">
                    <UserAvatar
                      name={user.user_metadata?.full_name}
                      size="50px"
                    />
                    <span className="user-name-text">
                      {user.user_metadata?.full_name}
                    </span>
                  </div>
                ) : (
                  <h2 className="vivid-logo">VIVID</h2>
                )}
              </div>

              <div className="drawer-links">
                <button onClick={() => handleNav("/login", "signin")}>
                  <LogIn size={20} /> <span>Sign In</span>
                </button>
                <button onClick={() => handleNav("/signup", "signup")}>
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
