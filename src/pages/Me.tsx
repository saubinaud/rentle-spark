
import { motion } from 'framer-motion';
import { useProfileStore } from '@/stores/useProfileStore';
import { useCreditStore } from '@/stores/useCreditStore';
import { useMatchStore } from '@/stores/useMatchStore';
import AppHeader from '@/components/AppHeader';
import { User, MapPin, GraduationCap, Calendar, CreditCard } from 'lucide-react';

const Me = () => {
  const { basicProfile, extraProfile } = useProfileStore();
  const { freeLeft, paidLeft } = useCreditStore();
  const { matches } = useMatchStore();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Profile Header */}
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-16 h-16 text-accent" />
              </div>
              
              <h1 className="text-3xl font-bold font-title mb-2">
                {basicProfile.name || 'Tu Nombre'}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
                {basicProfile.university && (
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{basicProfile.university}</span>
                  </div>
                )}
                {basicProfile.city && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{basicProfile.city}</span>
                  </div>
                )}
                {basicProfile.age && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{basicProfile.age} años</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-interactive">
                  <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        placeholder="Cuéntanos algo sobre ti..."
                        className="input-field min-h-[100px] resize-none"
                        value={extraProfile.bio}
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Hobbies</label>
                      <div className="flex flex-wrap gap-2">
                        {extraProfile.hobbies.length > 0 ? (
                          extraProfile.hobbies.map((hobby, index) => (
                            <span key={index} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                              {hobby}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">No hay hobbies agregados</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-interactive">
                  <h2 className="text-xl font-semibold mb-4">Matches Recientes</h2>
                  {matches.length > 0 ? (
                    <div className="space-y-3">
                      {matches.slice(0, 3).map((match) => (
                        <div key={match.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-xl">
                          <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                            <span className="text-accent font-semibold">{match.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{match.name}</div>
                            <div className="text-sm text-muted-foreground">{match.compatibility}% match</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No tienes matches aún. ¡Genera algunos!</p>
                  )}
                </div>
              </div>

              {/* Credits & Stats */}
              <div className="space-y-6">
                <div className="card-interactive">
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className="w-5 h-5 text-accent" />
                    <h2 className="text-xl font-semibold">Créditos</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Gratuitos</span>
                      <span className="font-semibold">{freeLeft}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Premium</span>
                      <span className="font-semibold">{paidLeft}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-accent">{freeLeft + paidLeft}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-interactive">
                  <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Matches totales</span>
                      <span className="font-semibold">{matches.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Perfil completado</span>
                      <span className="font-semibold">85%</span>
                    </div>
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
