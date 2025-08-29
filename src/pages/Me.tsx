import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfileStore } from '@/stores/useProfileStore';
import { useCreditStore } from '@/stores/useCreditStore';
import { useMatchStore } from '@/stores/useMatchStore';
import AppHeader from '@/components/AppHeader';
import EditableField from '@/components/EditableField';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  Sparkles, 
  TrendingUp, 
  Save, 
  Plus 
} from 'lucide-react';

const universities = ['Sorbonne', 'Sciences Po', 'HEC'];

/**
 * Me Component - User profile management page
 * Handles user profile editing, credit display, and completion tracking
 */
const Me = () => {
  const { basicProfile, extraProfile, updateProfile } = useProfileStore();
  const { freeLeft, paidLeft } = useCreditStore();
  const { matches } = useMatchStore();
  const [hasChanges, setHasChanges] = useState(false);

  /**
   * Handles saving field changes to the profile store
   * @param field - The field name to update
   * @param value - The new value for the field
   */
  const handleFieldSave = (field: string, value: string) => {
    updateProfile({ [field]: value });
    setHasChanges(true);
  };

  /**
   * Adds a new hobby to the user's hobby list
   * @param hobby - The hobby to add
   */
  const handleHobbyAdd = (hobby: string) => {
    if (!hobby.trim()) return; // Prevent empty hobbies
    const newHobbies = [...extraProfile.hobbies, hobby.trim()];
    updateProfile({ hobbies: newHobbies });
    setHasChanges(true);
  };

  /**
   * Removes a hobby from the user's hobby list
   * @param index - The index of the hobby to remove
   */
  const handleHobbyRemove = (index: number) => {
    const newHobbies = extraProfile.hobbies.filter((_, i) => i !== index);
    updateProfile({ hobbies: newHobbies });
    setHasChanges(true);
  };

  /**
   * Calculates profile completion percentage based on filled fields
   * @returns The completion percentage as a number
   */
  const completionPercentage = () => {
    let completed = 0;
    const total = 7;
    
    if (basicProfile.name) completed++;
    if (basicProfile.university) completed++;
    if (basicProfile.city) completed++;
    if (basicProfile.age) completed++;
    if (extraProfile.bio) completed++;
    if (extraProfile.hobbies.length > 0) completed++;
    if (matches.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced Profile Header */}
            <div className="text-center mb-16">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 gradient-primary rounded-3xl flex items-center justify-center mx-auto avatar-ring">
                  <User className="w-24 h-24 text-primary-foreground" aria-hidden="true" />
                </div>
                
                {/* Profile completion indicator */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-background border-2 border-primary rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-primary">
                      {completionPercentage()}% completado
                    </span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">
                {basicProfile.name || 'Tu Perfil'}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Personaliza tu perfil para obtener mejores matches y una experiencia más completa.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div 
                className="bg-card rounded-2xl p-6 border hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Créditos Gratuitos</p>
                    <p className="text-2xl font-bold">{freeLeft}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-card rounded-2xl p-6 border hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Sparkles className="w-6 h-6 text-purple-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Créditos Premium</p>
                    <p className="text-2xl font-bold">{paidLeft}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-card rounded-2xl p-6 border hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Matches Totales</p>
                    <p className="text-2xl font-bold">{matches.length}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Profile Edit Form */}
            <div className="bg-card rounded-2xl p-8 border">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Editar Perfil</h2>
                {hasChanges && (
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <Save className="w-4 h-4" aria-hidden="true" />
                    Cambios guardados automáticamente
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" aria-hidden="true" />
                    Información Básica
                  </h3>
                  
                  <EditableField
                    label="Nombre"
                    value={basicProfile.name || ''}
                    onSave={(value) => handleFieldSave('name', value)}
                    placeholder="Ingresa tu nombre"
                    required
                    aria-describedby="name-help"
                  />
                  <p id="name-help" className="text-sm text-muted-foreground">
                    Tu nombre será visible para otros usuarios.
                  </p>

                  <EditableField
                    label="Universidad"
                    value={basicProfile.university || ''}
                    onSave={(value) => handleFieldSave('university', value)}
                    placeholder="Selecciona tu universidad"
                    suggestions={universities}
                    icon={<GraduationCap className="w-4 h-4" aria-hidden="true" />}
                    aria-describedby="university-help"
                  />
                  <p id="university-help" className="text-sm text-muted-foreground">
                    Ayuda a encontrar matches con intereses académicos similares.
                  </p>

                  <EditableField
                    label="Ciudad"
                    value={basicProfile.city || ''}
                    onSave={(value) => handleFieldSave('city', value)}
                    placeholder="¿Dónde vives?"
                    icon={<MapPin className="w-4 h-4" aria-hidden="true" />}
                    aria-describedby="city-help"
                  />
                  <p id="city-help" className="text-sm text-muted-foreground">
                    Encuentra personas cerca de ti.
                  </p>

                  <EditableField
                    label="Edad"
                    value={basicProfile.age?.toString() || ''}
                    onSave={(value) => handleFieldSave('age', value)}
                    placeholder="Tu edad"
                    type="number"
                    min="18"
                    max="100"
                    icon={<Calendar className="w-4 h-4" aria-hidden="true" />}
                    aria-describedby="age-help"
                  />
                  <p id="age-help" className="text-sm text-muted-foreground">
                    Debe ser mayor de 18 años.
                  </p>
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                    Información Adicional
                  </h3>
                  
                  <EditableField
                    label="Biografía"
                    value={extraProfile.bio || ''}
                    onSave={(value) => handleFieldSave('bio', value)}
                    placeholder="Cuéntanos sobre ti..."
                    multiline
                    maxLength={500}
                    aria-describedby="bio-help"
                  />
                  <p id="bio-help" className="text-sm text-muted-foreground">
                    Una buena biografía aumenta tus posibilidades de match (máximo 500 caracteres).
                  </p>

                  {/* Hobbies Section */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Intereses y Hobbies
                    </label>
                    
                    <div className="flex flex-wrap gap-2 mb-4" role="list">
                      {extraProfile.hobbies.map((hobby, index) => (
                        <div 
                          key={index} 
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                          role="listitem"
                        >
                          <span>{hobby}</span>
                          <button
                            onClick={() => handleHobbyRemove(index)}
                            className="hover:bg-primary/20 rounded-full p-1 transition-colors"
                            aria-label={`Eliminar hobby: ${hobby}`}
                            type="button"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <EditableField
                      label="Agregar nuevo hobby"
                      value=""
                      onSave={handleHobbyAdd}
                      placeholder="Ej: Fotografía, Viajes, Deportes..."
                      icon={<Plus className="w-4 h-4" aria-hidden="true" />}
                      clearAfterSave
                      aria-describedby="hobbies-help"
                    />
                    <p id="hobbies-help" className="text-sm text-muted-foreground">
                      Agrega hasta 10 intereses para mejorar tus matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Me;
