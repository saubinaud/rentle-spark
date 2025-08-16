
import { motion } from 'framer-motion';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message = 'Cargando...' }: LoadingOverlayProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
