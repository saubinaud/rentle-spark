import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

/**
 * NotFound Component - 404 Error Page
 * Displays when users navigate to non-existent routes
 * Provides navigation options to go back or return home
 */
const NotFound = () => {
  const navigate = useNavigate();

  /**
   * Handles navigation back to previous page
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  /**
   * Handles navigation to home page
   */
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="main"
        aria-labelledby="error-title"
      >
        {/* Error Icon */}
        <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle 
            className="w-12 h-12 text-accent" 
            aria-hidden="true"
          />
        </div>
        
        {/* Error Code */}
        <div className="mb-6">
          <span 
            className="text-6xl font-bold text-accent block mb-2"
            aria-label="Error 404"
          >
            404
          </span>
        </div>
        
        {/* Error Title */}
        <h1 
          id="error-title" 
          className="text-3xl font-bold font-title mb-4 text-foreground"
        >
          Página no encontrada
        </h1>
        
        {/* Error Description */}
        <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Verifica la URL o utiliza los botones de navegación.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="btn-secondary flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            aria-label="Volver a la página anterior"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="btn-primary flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Ir a la página de inicio"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Ir al inicio</span>
          </button>
        </div>
        
        {/* Additional Help Text */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda? 
            <button
              onClick={handleGoHome}
              className="text-primary hover:underline ml-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
              aria-label="Contactar soporte desde la página de inicio"
            >
              Contacta con soporte
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
