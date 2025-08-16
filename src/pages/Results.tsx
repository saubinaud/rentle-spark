
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '@/stores/useMatchStore';
import { useCreditStore } from '@/stores/useCreditStore';
import AppHeader from '@/components/AppHeader';
import ModernMatchCard from '@/components/ModernMatchCard';
import EmptyState from '@/components/EmptyState';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Sparkles, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Results = () => {
  const navigate = useNavigate();
  const { matches, loading, generateMatches } = useMatchStore();
  const { freeLeft, paidLeft, consumeOne } = useCreditStore();

  useEffect(() => {
    if (matches.length === 0 && !loading) {
      handleGenerateMatches();
    }
  }, []);

  const handleGenerateMatches = async () => {
    if (freeLeft + paidLeft > 0) {
      consumeOne();
      await generateMatches();
    } else {
      navigate('/credits');
    }
  };

  const totalCredits = freeLeft + paidLeft;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <AnimatePresence>
        {loading && <LoadingOverlay message="Analizando tu personalidad y generando matches perfectos..." />}
      </AnimatePresence>

      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold font-title mb-6 text-gradient kerning-tight">
              Tus Matches Perfectos
            </h1>
            <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
              Descubre estudiantes con los que tienes una alta compatibilidad basada en tu personalidad y preferencias
            </p>

            <button
              onClick={handleGenerateMatches}
              disabled={totalCredits === 0 || loading}
              className="btn-primary flex items-center space-x-3 mx-auto text-lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Generar Nuevos Matches</span>
            </button>
          </motion.div>

          {matches.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {matches.map((match, index) => (
                <ModernMatchCard key={match.id} match={match} index={index} />
              ))}
            </motion.div>
          ) : !loading && (
            <EmptyState
              title="No hay matches disponibles"
              description="Genera tu primera comparación para descubrir estudiantes compatibles contigo."
              icon={<Sparkles className="w-full h-full" />}
              action={
                <button
                  onClick={handleGenerateMatches}
                  disabled={totalCredits === 0}
                  className="btn-primary"
                >
                  Generar Mis Primeros Matches
                </button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
