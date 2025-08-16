
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfileStore } from '@/stores/useProfileStore';
import { useCreditStore } from '@/stores/useCreditStore';
import { useMatchStore } from '@/stores/useMatchStore';
import AppHeader from '@/components/AppHeader';
import EditableField from '@/components/EditableField';
import { User, MapPin, GraduationCap, Calendar, CreditCard, Sparkles, TrendingUp, Save, Plus } from 'lucide-react';

const universities = ['Sorbonne', 'Sciences Po', 'HEC'];

const Me = () => {
  const { basicProfile, extraProfile, updateProfile } = useProfileStore();
  const { freeLeft, paidLeft } = useCreditStore();
  const { matches } = useMatchStore();
  const [hasChanges, setHasChanges] = useState(false);

  const handleFieldSave = (field: string, value: string) => {
    updateProfile({ [field]: value });
    setHasChanges(true);
  };

  const handleHobbyAdd = (hobby: string) => {
    const newHobbies = [...extraProfile.hobbies, hobby];
    updateProfile({ hobbies: newHobbies });
    setHasChanges(true);
  };

  const handleHobbyRemove = (index: number) => {
    const newHobbies = extraProfile.hobbies.filter((_, i) => i !== index);
    updateProfile({ hobbies: newHobbies });
    setHasChanges(true);
  };

  const completionPercentage = () => {
    let completed = 0;
    let total = 7;
    
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
                  <User className="w-24 h-24 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center shadow-strong">
                  <Sparkles className="w-8 h-8 text-secondary-foreground" />
                </div>
              </div>
              
              <h1 className="text-5xl font-bold font-title mb-4 text-gradient kerning-tight">
                {basicProfile.name || 'Tu Perfil'}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground mb-8">
                {basicProfile.university && (
                  <div className="flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{basicProfile.university}</span>
                  </div>
                )}
                {basicProfile.city && (
                  <div className="flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{basicProfile.city}</span>
                  </div>
                )}
                {basicProfile.age && (
                  <div className="flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{basicProfile.age} años</span>
                  </div>
                )}
              </div>

              {/* Profile Completion */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-muted-foreground">Perfil completado</span>
                  <span className="font-bold text-primary text-lg">{completionPercentage()}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage()}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Enhanced Profile Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold font-title kerning-tight">Información Básica</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <EditableField
                      label="Nombre completo"
                      value={basicProfile.name}
                      onSave={(value) => handleFieldSave('name', value)}
                      placeholder="Tu nombre completo"
                    />
                    
                    <EditableField
                      label="Email"
                      value={basicProfile.email}
                      onSave={(value) => handleFieldSave('email', value)}
                      placeholder="tu@email.com"
                    />
                    
                    <EditableField
                      label="Universidad"
                      value={basicProfile.university}
                      onSave={(value) => handleFieldSave('university', value)}
                      type="select"
                      options={universities}
                      placeholder="Selecciona tu universidad"
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <EditableField
                        label="Ciudad"
                        value={basicProfile.city}
                        onSave={(value) => handleFieldSave('city', value)}
                        placeholder="Tu ciudad"
                      />
                      
                      <EditableField
                        label="Edad"
                        value={basicProfile.age.toString()}
                        onSave={(value) => handleFieldSave('age', parseInt(value))}
                        type="select"
                        options={Array.from({ length: 23 }, (_, i) => (i + 18).toString())}
                        placeholder="Tu edad"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Extended Profile */}
                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 gradient-secondary rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold font-title kerning-tight">Información Personal</h2>
                  </div>
                  
                  <div className="space-y-8">
                    <EditableField
                      label="Biografía personal"
                      value={extraProfile.bio}
                      onSave={(value) => handleFieldSave('bio', value)}
                      type="textarea"
                      placeholder="Cuéntanos algo sobre ti, tus pasiones, lo que te hace único..."
                    />
                    
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-4">Intereses y Hobbies</label>
                      <div className="flex flex-wrap gap-3 mb-4">
                        {extraProfile.hobbies.map((hobby, index) => (
                          <motion.span 
                            key={index} 
                            className="px-4 py-2 bg-primary/10 text-primary rounded-2xl font-medium border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors group"
                            onClick={() => handleHobbyRemove(index)}
                            whileHover={{ scale: 1.05 }}
                          >
                            {hobby}
                            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                          </motion.span>
                        ))}
                        {extraProfile.hobbies.length === 0 && (
                          <span className="text-muted-foreground italic">No hay hobbies agregados</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          const hobby = prompt('Agregar nuevo hobby:');
                          if (hobby) handleHobbyAdd(hobby);
                        }}
                        className="btn-outline flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar hobby</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Recent Matches */}
                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold font-title kerning-tight">Matches Recientes</h2>
                  </div>

                  {matches.length > 0 ? (
                    <div className="space-y-4">
                      {matches.slice(0, 3).map((match, index) => (
                        <motion.div 
                          key={match.id} 
                          className="flex items-center space-x-4 p-6 bg-muted/20 rounded-3xl border border-border/30 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          onClick={() => window.location.href = `/profile/${match.id}`}
                        >
                          <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center shadow-soft">
                            <span className="text-primary-foreground font-bold text-xl">{match.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-lg kerning-tight">{match.name}</div>
                            <div className="text-sm text-muted-foreground">{match.university}</div>
                          </div>
                          <div className="match-compatibility">
                            {match.compatibility}% match
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-6 text-lg">No tienes matches aún</p>
                      <button 
                        className="btn-primary"
                        onClick={() => window.location.href = '/form'}
                      >
                        ¡Genera algunos matches!
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Enhanced Credits & Stats */}
              <div className="space-y-8">
                {/* Save Changes */}
                {hasChanges && (
                  <motion.div 
                    className="card-elevated bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="text-center">
                      <Save className="w-8 h-8 text-primary mx-auto mb-3" />
                      <p className="text-primary font-semibold mb-4">Cambios guardados automáticamente</p>
                      <button
                        onClick={() => setHasChanges(false)}
                        className="btn-primary w-full"
                      >
                        Confirmar cambios
                      </button>
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-10 h-10 gradient-secondary rounded-2xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold font-title kerning-tight">Créditos</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-primary/5 rounded-2xl border border-primary/20">
                      <span className="text-muted-foreground font-semibold">Gratuitos</span>
                      <span className="font-bold text-2xl text-primary">{freeLeft}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-secondary/5 rounded-2xl border border-secondary/20">
                      <span className="text-muted-foreground font-semibold">Premium</span>
                      <span className="font-bold text-2xl text-secondary">{paidLeft}</span>
                    </div>
                    <div className="border-t border-border/50 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xl">Total disponible</span>
                        <span className="font-bold text-3xl text-gradient">{freeLeft + paidLeft}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-8 font-title kerning-tight">Estadísticas</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted/20 rounded-2xl">
                      <span className="text-muted-foreground font-semibold">Matches totales</span>
                      <span className="font-bold text-2xl text-primary">{matches.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/20 rounded-2xl">
                      <span className="text-muted-foreground font-semibold">Perfil completado</span>
                      <span className="font-bold text-2xl text-secondary">{completionPercentage()}%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted/20 rounded-2xl">
                      <span className="text-muted-foreground font-semibold">Compatibilidad promedio</span>
                      <span className="font-bold text-2xl text-gradient">
                        {matches.length > 0 
                          ? Math.round(matches.reduce((acc, match) => acc + match.compatibility, 0) / matches.length)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Me;
