
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Sparkles } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-title">Rentle</h1>
          <button 
            onClick={() => navigate('/auth')}
            className="btn-secondary"
          >
            Log in
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-title leading-tight">
              Find Your Perfect
              <span className="text-accent block">University Match</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Conecta con estudiantes compatibles usando ciencia de la personalidad y algoritmos avanzados de matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/auth')}
                className="btn-primary text-lg"
              >
                Create Profile
              </button>
              <button 
                onClick={() => navigate('/auth')}
                className="btn-secondary text-lg"
              >
                Explore Matches
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Compatibilidad Científica</h3>
              <p className="text-muted-foreground">
                Algoritmos basados en Big Five, MBTI y otros tests de personalidad validados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Solo Universitarios</h3>
              <p className="text-muted-foreground">
                Una comunidad exclusiva de estudiantes universitarios verificados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Matches de Calidad</h3>
              <p className="text-muted-foreground">
                Conexiones auténticas basadas en compatibilidad real, no solo fotos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
