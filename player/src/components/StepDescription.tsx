import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  description: string;
  stepId: string;
}

export default function StepDescription({ description, stepId }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        style={{
          background: 'rgba(20,20,24,0.95)',
          border: '1px solid #2a2a2e',
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 13,
          color: '#ccc',
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap',
          maxWidth: '80%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {description}
      </motion.div>
    </AnimatePresence>
  );
}
