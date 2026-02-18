import React, { createContext, useState, useContext } from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  const handleNavigate = (path, signUpMode) => {
    closeAuthModal();
    navigate(path, { state: { startInSignUp: signUpMode } });
  };

  return (
    <AuthContext.Provider value={{ openAuthModal }}>
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
