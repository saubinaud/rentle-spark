
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '@/stores/useFormStore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppHeader from '@/components/AppHeader';
import Stepper from '@/components/Stepper';
import TransitionView from '@/components/TransitionView';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = ['General', 'Big Five', 'Dark Triad', 'MBTI', 'Zodiac'];

const questions = {
  0: {
    question: "¿Qué actividad disfrutas más en tu tiempo libre?",
    options: ["Leer libros", "Salir con amigos", "Hacer ejercicio", "Ver series", "Viajar", "Cocinar"],
  },
  1: {
    question: "¿Cómo te describes en situaciones sociales?",
    options: ["Muy extrovertido", "Algo extrovertido", "Equilibrado", "Algo introvertido", "Muy introvertido"],
  },
  2: {
    question: "¿Qué tan importante es para ti ganar en una competencia?",
    options: ["Extremadamente importante", "Muy importante", "Moderadamente importante", "Poco importante", "Nada importante"],
  },
  3: {
    question: "¿Prefieres planificar con anticipación o ser espontáneo?",
    options: ["Siempre planifico", "Generalmente planifico", "Depende de la situación", "Generalmente espontáneo", "Siempre espontáneo"],
  },
  4: {
    question: "¿Cuál es tu signo zodiacal?",
    options: ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"],
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

  const currentAnswer = [general, big5, dark, mbti, zodiac][currentStep];
  const currentQuestion = questions[currentStep as keyof typeof questions];

  const handleSelect = (option: string) => {
    const stepKeys = ['general', 'big5', 'dark', 'mbti', 'zodiac'];
    const stepKey = stepKeys[currentStep];
    updateAnswers(stepKey, option);
  };

  const handleNext = () => {
    if (currentStep === 4) {
      navigate('/results');
    } else {
      nextStep();
    }
  };

  const canProceed = currentAnswer.length > 0;

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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-elevated"
                >
                  <h2 className="text-3xl font-bold font-title mb-8 text-gradient kerning-tight">
                    {currentQuestion.question}
                  </h2>
                  
                  <RadioGroup
                    value={currentAnswer}
                    onValueChange={handleSelect}
                    className="space-y-4"
                  >
                    {currentQuestion.options.map((option, index) => (
                      <motion.div
                        key={option}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-200 hover:bg-primary/5 cursor-pointer"
                        onClick={() => handleSelect(option)}
                      >
                        <RadioGroupItem value={option} id={option} className="text-primary" />
                        <label 
                          htmlFor={option} 
                          className="text-lg font-medium cursor-pointer flex-1"
                        >
                          {option}
                        </label>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </motion.div>
              </TransitionView>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block">
              <TransitionView currentKey={currentStep}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-3xl p-12 h-96 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-32 h-32 gradient-primary rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-strong">
                      <span className="text-4xl font-bold text-primary-foreground">{currentStep + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary font-title">{steps[currentStep]}</h3>
                    <p className="text-muted-foreground mt-2">Paso {currentStep + 1} de {steps.length}</p>
                  </div>
                </motion.div>
              </TransitionView>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-outline flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Anterior</span>
            </button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Pregunta {currentStep + 1} de {steps.length}
              </p>
            </div>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{currentStep === 4 ? 'Ver Resultados' : 'Siguiente'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
