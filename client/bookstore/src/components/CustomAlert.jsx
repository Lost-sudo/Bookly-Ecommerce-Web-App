import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const CustomAlert = ({ show, message, type = "success", onClose }) => {
  const alertConfig = {
    success: {
      icon: <FaCheckCircle size={24} />,
      bgColor: "var(--color-card)",
      borderColor: "var(--color-primary)",
    },
    error: {
      icon: <FaExclamationCircle size={24} />,
      bgColor: "var(--color-card)",
      borderColor: "#dc3545",
    },
    warning: {
      icon: <FaExclamationTriangle size={24} />,
      bgColor: "var(--color-card)",
      borderColor: "#ffc107",
    },
    info: {
      icon: <FaInfoCircle size={24} />,
      bgColor: "var(--color-card)",
      borderColor: "var(--color-primary)",
    },
  };

  const config = alertConfig[type] || alertConfig.info;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            backgroundColor: config.bgColor,
            color: "var(--color-text)",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            border: `1px solid ${config.borderColor}`,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            minWidth: "300px",
            backdropFilter: "blur(8px)",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          <div style={{ marginRight: "0.5rem" }}>{config.icon}</div>
          <span style={{ flex: 1 }}>{message}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
            }}
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
