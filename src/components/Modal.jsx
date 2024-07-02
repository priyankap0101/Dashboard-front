// src/components/Modal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.5 } }
};

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={onClose}
    >
      <motion.div 
        className="bg-white p-8 rounded shadow-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button 
          className="absolute top-0 right-0 m-4 text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
