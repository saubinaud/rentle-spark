// src/pages/Landing.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Sparkles, Star, Shield, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-pink-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Header de navegación */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-['Inter',_system-ui,_sans-serif] text-indigo-600 dark:text-indigo-400"
          >
            Rentle
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigateToAuth}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            type="button"
            aria-label="Iniciar sesión en la aplicación"
          >
            Iniciar Sesión
          </motion.button>
        </div>
      </header>

      {/* Sección principal (Hero) */}
      <main className="relative z-10">
        <section className="pt-32 pb-20 px-6" aria-labelledby="hero-title">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1
                id="hero-title"
                className="text-5xl md:text-7xl font-bold mb-6 font-['Inter',_system-ui,_sans-serif] leading-tight text-gray-900 dark:text-white"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block"
                >
                  Encuentra Tu Pareja
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-indigo-600 dark:text-indigo-400 block bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                >
                  Universitaria Perfecta
                </motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Conecta con estudiantes compatibles usando ciencia de la personalidad 
                y algoritmos avanzados de matching para relaciones auténticas.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNavigateToAuth}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl shadow-2xl transition-all duration-300 overflow-hidden"
                  type="button"
                  aria-label="Comenzar a usar Rentle"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Comenzar Ahora
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-lg font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300"
                  type="button"
                >
                  Saber Más
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sección de características */}
        <section className="py-20 px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" aria-labelledby="features-title">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              id="features-title"
              className="text-4xl font-bold text-center mb-16 font-['Inter',_system-ui,_sans-serif] text-gray-900 dark:text-white"
            >
              ¿Por qué elegir Rentle?
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Matching Inteligente",
                  description: "Algoritmos avanzados que analizan compatibilidad de personalidad para conexiones más profundas.",
                  delay: 0.2
                },
                {
                  icon: Shield,
                  title: "Entorno Seguro",
                  description: "Verificación universitaria y moderación activa para una experiencia segura y auténtica.",
                  delay: 0.4
                },
                {
                  icon: Sparkles,
                  title: "Conexiones Reales",
                  description: "Enfoque en relaciones significativas basadas en intereses y valores compartidos.",
                  delay: 0.6
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: feature.delay,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <motion.div 
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 font-['Inter',_system-ui,_sans-serif] text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-20 px-6" aria-labelledby="cta-title">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-3xl p-12 shadow-2xl"
            >
              <h2
                id="cta-title"
                className="text-4xl font-bold mb-6 font-['Inter',_system-ui,_sans-serif] text-white"
              >
                ¿Listo para encontrar tu match perfecto?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Únete a miles de estudiantes que ya encontraron conexiones reales en Rentle.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNavigateToAuth}
                className="group relative px-8 py-4 bg-white text-indigo-600 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                type="button"
                aria-label="Comenzar tu viaje en Rentle"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Comenzar Mi Viaje
                </div>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
