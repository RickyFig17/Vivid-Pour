import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText,
  onConfirm,
  type = "default",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`vivid-modal ${type}-theme`}
            initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{
              scale: 0.8,
              opacity: 0,
              x: "-50%",
              y: "-40%",
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h3>{title}</h3>
            <div className="modal-body">{children}</div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className={`confirm-btn ${type === "danger" ? "danger" : ""}`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
