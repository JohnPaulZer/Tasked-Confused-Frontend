import React from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean; // Controls if modal is visible
  onClose: () => void; // Function to close the modal
  title?: string; // Header text
  children: React.ReactNode; // Body text or inputs
  footer?: React.ReactNode; // Place for your 1 or 2 buttons
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        // OVERLAY - Fade in/out animation
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* MODAL CARD - Scale and fade animation */}
          <motion.div
            className="bg-secondary w-11/12 max-w-md rounded-3xl p-6 shadow-2xl border-2 border-primary relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1], // Custom cubic-bezier for bouncy feel
            }}
          >
            {/* Close button with hover animation */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-primary text-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </motion.button>

            {/* Title with staggered animation */}
            {title && (
              <motion.h2
                className="text-2xl font-serif font-bold text-primary mb-4 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {title}
              </motion.h2>
            )}

            {/* Body content with staggered animation */}
            <motion.div
              className="text-primary/80 font-serif text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>

            {/* Footer with staggered animation */}
            {footer && (
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                {footer}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
