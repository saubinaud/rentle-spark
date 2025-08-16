
import { useState } from 'react';
import { Check, X, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  type?: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
}

const EditableField = ({ 
  label, 
  value, 
  onSave, 
  type = 'text', 
  options, 
  placeholder 
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <label className="block text-sm font-semibold text-primary">{label}</label>
        
        {type === 'textarea' ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder={placeholder}
            autoFocus
          />
        ) : type === 'select' && options ? (
          <select
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="input-field"
            autoFocus
          >
            <option value="">Selecciona una opción</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="input-field"
            placeholder={placeholder}
            autoFocus
          />
        )}
        
        <div className="flex items-center space-x-3">
          <button onClick={handleSave} className="btn-primary px-4 py-2 text-sm">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={handleCancel} className="btn-outline px-4 py-2 text-sm">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="group">
      <label className="block text-sm font-semibold text-primary mb-2">{label}</label>
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50 group-hover:border-primary/50 transition-colors duration-200">
        <div className="flex-1">
          {value ? (
            <span className="text-foreground">{value}</span>
          ) : (
            <span className="text-muted-foreground italic">{placeholder || `Agregar ${label.toLowerCase()}`}</span>
          )}
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-primary hover:text-primary/80 p-2"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EditableField;
