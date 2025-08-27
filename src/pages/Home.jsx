import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";

export default function Home() {
  const messages = [
    "Welcome!",
    "It's good to have you on board",
    "Let's get started!",
  ];

  const [index, setIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (index >= messages.length - 1) return;

    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 2000); // show each message 2s before moving to next

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    // show button only after the last message
    if (index === messages.length - 1) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 500); // slight delay for smoothness
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Messages */}
      <AnimatePresence mode="wait">
        {index < messages.length && (
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-800"
          >
            {messages[index]}
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Button appears only after last message */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "12px", textTransform: "none" }}
          >
            Start Here
          </Button>
        </motion.div>
      )}
    </div>
  );
}
