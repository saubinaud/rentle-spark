
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-bold text-accent">404</span>
        </div>
        
        <h1 className="text-3xl font-bold font-title mb-4">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Ir al inicio</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
