import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Ensure this path matches your file
import AuthModal from "./AuthModal";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1. Monitor Auth State
  useEffect(() => {
    // Check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for sign-in/sign-out events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Modal Logic
  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  const handleNavigate = (path, signUpMode) => {
    closeAuthModal();
    navigate(path, { state: { startInSignUp: signUpMode } });
  };

  return (
    <AuthContext.Provider value={{ openAuthModal, closeAuthModal, user }}>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeAuthModal}
        onNavigate={handleNavigate}
      />
    </AuthContext.Provider>
  );
};

export const useAuthPrompt = () => useContext(AuthContext);
