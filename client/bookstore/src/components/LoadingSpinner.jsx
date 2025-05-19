import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-wrapper"
    >
      <div className="loading-spinner"></div>
    </motion.div>
  );
};

export default LoadingSpinner;