
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '@/stores/useMatchStore';
import { useCreditStore } from '@/stores/useCreditStore';
import AppHeader from '@/components/AppHeader';
import MatchCard from '@/components/MatchCard';
import EmptyState from '@/components/EmptyState';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Sparkles, RefreshCw } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

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
        {loading && <LoadingOverlay message="Analizando tu personalidad y generando matches..." />}
      </AnimatePresence>

      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-title mb-4">Tus Matches</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Estos son los estudiantes más compatibles contigo basado en tu personalidad
            </p>

            <button
              onClick={handleGenerateMatches}
              disabled={totalCredits === 0 || loading}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate New Comparison</span>
            </button>
          </div>

          {matches.length > 0 ? (
            <div className="space-y-6">
              {matches.map((match, index) => (
                <MatchCard key={match.id} match={match} index={index} />
              ))}
            </div>
          ) : !loading && (
            <EmptyState
              title="No hay matches disponibles"
              description="Genera tu primera comparación para ver estudiantes compatibles contigo."
              icon={<Sparkles className="w-full h-full" />}
              action={
                <button
                  onClick={handleGenerateMatches}
                  disabled={totalCredits === 0}
                  className="btn-primary"
                >
                  Generar Matches
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
