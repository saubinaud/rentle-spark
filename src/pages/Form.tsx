
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '@/stores/useFormStore';
import AppHeader from '@/components/AppHeader';
import Stepper from '@/components/Stepper';
import QuestionCard from '@/components/QuestionCard';
import TransitionView from '@/components/TransitionView';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const steps = ['General', 'Big Five', 'Dark Triad', 'MBTI', 'Zodiac'];

const questions = {
  0: {
    question: "¿Qué actividades disfrutas más en tu tiempo libre?",
    options: ["Leer libros", "Salir con amigos", "Hacer ejercicio", "Ver series", "Viajar", "Cocinar"],
    multiSelect: true
  },
  1: {
    question: "¿Cómo te describes en situaciones sociales?",
    options: ["Muy extrovertido", "Algo extrovertido", "Equilibrado", "Algo introvertido", "Muy introvertido"],
    multiSelect: false
  },
  2: {
    question: "¿Qué tan importante es para ti ganar en una competencia?",
    options: ["Extremadamente importante", "Muy importante", "Moderadamente importante", "Poco importante", "Nada importante"],
    multiSelect: false
  },
  3: {
    question: "¿Prefieres planificar con anticipación o ser espontáneo?",
    options: ["Siempre planifico", "Generalmente planifico", "Depende de la situación", "Generalmente espontáneo", "Siempre espontáneo"],
    multiSelect: false
  },
  4: {
    question: "¿Cuál es tu signo zodiacal?",
    options: ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"],
    multiSelect: false
  }
};

const Form = () => {
  const navigate = useNavigate();
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    general, 
    big5, 
    dark, 
    mbti, 
    zodiac, 
    updateAnswers 
  } = useFormStore();

  const currentAnswers = [general, big5, dark, mbti, [zodiac].filter(Boolean)][currentStep];
  const currentQuestion = questions[currentStep as keyof typeof questions];

  const handleSelect = (option: string) => {
    const stepKeys = ['general', 'big5', 'dark', 'mbti', 'zodiac'];
    const stepKey = stepKeys[currentStep];
    
    if (currentQuestion.multiSelect) {
      const current = currentAnswers as string[];
      const newAnswers = current.includes(option)
        ? current.filter(a => a !== option)
        : [...current, option];
      updateAnswers(stepKey, newAnswers);
    } else {
      updateAnswers(stepKey, currentStep === 4 ? option : [option]);
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      navigate('/results');
    } else {
      nextStep();
    }
  };

  const canProceed = currentAnswers.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <Stepper 
              currentStep={currentStep} 
              totalSteps={5} 
              steps={steps} 
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Questions */}
            <div>
              <TransitionView currentKey={currentStep}>
                <QuestionCard
                  question={currentQuestion.question}
                  options={currentQuestion.options}
                  selectedOptions={currentAnswers as string[]}
                  onSelect={handleSelect}
                  multiSelect={currentQuestion.multiSelect}
                />
              </TransitionView>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block">
              <TransitionView currentKey={currentStep}>
                <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-2xl p-12 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-accent/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-accent">{currentStep + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-accent">{steps[currentStep]}</h3>
                  </div>
                </div>
              </TransitionView>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <span>{currentStep === 4 ? 'Ver Resultados' : 'Siguiente'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
