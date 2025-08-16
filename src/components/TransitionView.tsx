
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface TransitionViewProps {
  children: ReactNode;
  currentKey: string | number;
}

const TransitionView = ({ children, currentKey }: TransitionViewProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentKey}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionView;
