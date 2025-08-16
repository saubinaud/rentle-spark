
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
  multiSelect?: boolean;
}

const QuestionCard = ({ 
  question, 
  options, 
  selectedOptions, 
  onSelect, 
  multiSelect = false 
}: QuestionCardProps) => {
  return (
    <motion.div 
      className="bg-card rounded-2xl p-8 shadow-md border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-6 text-foreground">{question}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          
          return (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className={`chip-option ${isSelected ? 'chip-selected' : ''}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
