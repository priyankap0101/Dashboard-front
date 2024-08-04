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
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={onClose}
    >
      <motion.div 
        className="p-8 bg-white rounded shadow-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button 
          className="absolute top-0 right-0 m-4 text-xl text-black"
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
