// src/pages/Landing.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Sparkles } from 'lucide-react';

/**
 * Página de aterrizaje principal de la aplicación Rentle
 * Presenta la propuesta de valor y permite a los usuarios registrarse o iniciar sesión
 */
const Landing = () => {
  const navigate = useNavigate();

  /**
   * Navega a la página de autenticación
   */
  const handleNavigateToAuth = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header de navegación */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-title text-primary">
            Rentle
          </h1>
          <button
            onClick={handleNavigateToAuth}
            className="btn-secondary"
            type="button"
            aria-label="Iniciar sesión en la aplicación"
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Sección principal (Hero) */}
      <main>
        <section 
          className="pt-32 pb-20 px-6"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 
                id="hero-title"
                className="text-5xl md:text-7xl font-bold mb-6 font-title leading-tight"
              >
                Encuentra Tu Pareja
                <span className="text-accent block">
                  Universitaria Perfecta
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Conecta con estudiantes compatibles usando ciencia de la personalidad 
                y algoritmos avanzados de matching para relaciones auténticas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleNavigateToAuth}
                  className="btn-primary text-lg px-8 py-3"
                  type="button"
                  aria-label="Crear perfil en Rentle"
                >
                  Crear Perfil
                </button>
                <button
                  onClick={handleNavigateToAuth}
                  className="btn-secondary text-lg px-8 py-3"
                  type="button"
                  aria-label="Explorar perfiles compatibles"
                >
                  Explorar Matches
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sección de características */}
        <section 
          className="py-20 px-6 bg-muted/30"
          aria-labelledby="features-title"
        >
          <div className="container mx-auto">
            <h2 
              id="features-title"
              className="sr-only"
            >
              Características principales de Rentle
            </h2>
            
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Característica 1: Compatibilidad Científica */}
              <article className="text-center">
                <div 
                  className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  aria-hidden="true"
                >
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Compatibilidad Científica
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Algoritmos basados en Big Five, MBTI y otros tests de personalidad 
                  científicamente validados para matches más precisos.
                </p>
              </article>

              {/* Característica 2: Comunidad Universitaria */}
              <article className="text-center">
                <div 
                  className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  aria-hidden="true"
                >
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Solo Universitarios
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Una comunidad exclusiva y segura de estudiantes universitarios 
                  verificados que comparten tu etapa de vida.
                </p>
              </article>

              {/* Característica 3: Matches de Calidad */}
              <article className="text-center">
                <div 
                  className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  aria-hidden="true"
                >
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Matches de Calidad
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Conexiones auténticas basadas en compatibilidad real y valores 
                  compartidos, no solo en apariencia física.
                </p>
              </article>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer básico */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Rentle. Conectando corazones universitarios.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
