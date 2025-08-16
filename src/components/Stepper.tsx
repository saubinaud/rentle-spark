
interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const Stepper = ({ currentStep, totalSteps, steps }: StepperProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          Paso {currentStep + 1} de {totalSteps}
        </span>
        <span className="font-medium text-foreground">
          {steps[currentStep]}
        </span>
      </div>
    </div>
  );
};

export default Stepper;
