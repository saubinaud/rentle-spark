
import { motion } from 'framer-motion';
import { useProfileStore } from '@/stores/useProfileStore';
import { useCreditStore } from '@/stores/useCreditStore';
import { useMatchStore } from '@/stores/useMatchStore';
import AppHeader from '@/components/AppHeader';
import { User, MapPin, GraduationCap, Calendar, CreditCard, Sparkles, TrendingUp } from 'lucide-react';

const Me = () => {
  const { basicProfile, extraProfile } = useProfileStore();
  const { freeLeft, paidLeft } = useCreditStore();
  const { matches } = useMatchStore();

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
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Enhanced Profile Header */}
            <div className="text-center mb-16">
              <div className="relative inline-block mb-8">
                <div className="w-36 h-36 gradient-accent rounded-3xl flex items-center justify-center mx-auto avatar-ring">
                  <User className="w-20 h-20 text-accent-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-medium">
                  <Sparkles className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold font-title mb-3 text-gradient kerning-tight">
                {basicProfile.name || 'Tu Nombre'}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground mb-6">
                {basicProfile.university && (
                  <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-xl">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="font-medium">{basicProfile.university}</span>
                  </div>
                )}
                {basicProfile.city && (
                  <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-xl">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{basicProfile.city}</span>
                  </div>
                )}
                {basicProfile.age && (
                  <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-xl">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">{basicProfile.age} años</span>
                  </div>
                )}
              </div>

              {/* Profile Completion */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Perfil completado</span>
                  <span className="text-sm font-bold text-primary">{completionPercentage()}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${completionPercentage()}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Enhanced Profile Info */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-semibold font-title kerning-tight">Información Personal</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-primary">Bio Personal</label>
                      <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                        {extraProfile.bio ? (
                          <p className="text-muted-foreground leading-relaxed">{extraProfile.bio}</p>
                        ) : (
                          <p className="text-text-muted italic">Cuéntanos algo sobre ti...</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-primary">Intereses y Hobbies</label>
                      <div className="flex flex-wrap gap-3">
                        {extraProfile.hobbies.length > 0 ? (
                          extraProfile.hobbies.map((hobby, index) => (
                            <motion.span 
                              key={index} 
                              className="px-4 py-2 bg-accent/10 text-accent rounded-xl text-sm font-medium border border-accent/20"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              {hobby}
                            </motion.span>
                          ))
                        ) : (
                          <span className="text-text-muted text-sm italic">No hay hobbies agregados</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 gradient-accent rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <h2 className="text-2xl font-semibold font-title kerning-tight">Matches Recientes</h2>
                  </div>

                  {matches.length > 0 ? (
                    <div className="space-y-4">
                      {matches.slice(0, 3).map((match, index) => (
                        <motion.div 
                          key={match.id} 
                          className="flex items-center space-x-4 p-4 bg-muted/20 rounded-2xl border border-border/30 hover:bg-muted/30 transition-all duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center shadow-soft">
                            <span className="text-accent-foreground font-bold text-lg">{match.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg kerning-tight">{match.name}</div>
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
                      <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-4">No tienes matches aún</p>
                      <button className="btn-accent">
                        ¡Genera algunos!
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Enhanced Credits & Stats */}
              <div className="space-y-8">
                <motion.div 
                  className="card-elevated"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 gradient-accent rounded-xl flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold font-title kerning-tight">Créditos</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-muted-foreground font-medium">Gratuitos</span>
                      <span className="font-bold text-xl text-accent">{freeLeft}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-muted-foreground font-medium">Premium</span>
                      <span className="font-bold text-xl text-primary">{paidLeft}</span>
                    </div>
                    <div className="border-t border-border/50 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total disponible</span>
                        <span className="font-bold text-2xl text-gradient">{freeLeft + paidLeft}</span>
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
                  <h2 className="text-xl font-semibold mb-6 font-title kerning-tight">Estadísticas</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-muted-foreground font-medium">Matches totales</span>
                      <span className="font-bold text-xl text-primary">{matches.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-muted-foreground font-medium">Perfil completado</span>
                      <span className="font-bold text-xl text-accent">{completionPercentage()}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                      <span className="text-muted-foreground font-medium">Compatibilidad promedio</span>
                      <span className="font-bold text-xl text-gradient">
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
