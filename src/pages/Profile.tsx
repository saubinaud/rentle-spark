
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMatchStore } from '@/stores/useMatchStore';
import AppHeader from '@/components/AppHeader';
import Modal from '@/components/Modal';
import { ArrowLeft, Heart, MapPin, GraduationCap, Eye, Download } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { matches } = useMatchStore();
  const [showModal, setShowModal] = useState(false);

  const profile = matches.find(m => m.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Perfil no encontrado</h1>
          <button onClick={() => navigate('/results')} className="btn-primary">
            Volver a resultados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate('/results')}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a matches</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Main */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card-interactive">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/40 rounded-2xl flex items-center justify-center text-accent font-bold text-2xl">
                      {profile.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h1 className="text-3xl font-bold font-title">{profile.name}</h1>
                        <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                          {profile.compatibility}% match
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>{profile.university}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.city}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>{profile.age} años</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {profile.teaser}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-interactive">
                  <h2 className="text-xl font-semibold mb-4">Personalidad</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">MBTI</div>
                      <div className="font-semibold text-lg">{profile.mbti}</div>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">Signo</div>
                      <div className="font-semibold text-lg">{profile.zodiac}</div>
                    </div>
                  </div>
                </div>

                <div className="card-interactive">
                  <h2 className="text-xl font-semibold mb-4">Resumen de Compatibilidad</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Tienes una alta compatibilidad con {profile.name} basada en sus respuestas del Big Five y MBTI. 
                    Ambos comparten valores similares en apertura a experiencias y consciencia. 
                    Sus personalidades se complementan muy bien, especialmente en aspectos sociales y de comunicación.
                  </p>
                </div>
              </div>

              {/* Actions Sidebar */}
              <div className="space-y-6">
                <div className="card-interactive">
                  <h3 className="font-semibold mb-4">Acciones</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full btn-secondary flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver comparación gratuita</span>
                    </button>
                    
                    <button className="w-full btn-primary flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Descargar reporte premium</span>
                    </button>
                  </div>
                </div>

                <div className="card-interactive">
                  <h3 className="font-semibold mb-4">Compatibilidad Detallada</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Comunicación</span>
                      <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '90%' }} />
                      </div>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Valores</span>
                      <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Intereses</span>
                      <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '78%' }} />
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Comparación Gratuita"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            <strong>{profile.name}</strong> y tú comparten una alta compatibilidad del <strong>{profile.compatibility}%</strong>.
          </p>
          
          <div className="bg-muted/30 rounded-xl p-4">
            <h4 className="font-semibold mb-2">Puntos en común:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ambos valoran la comunicación profunda</li>
              <li>• Intereses similares en arte y cultura</li>
              <li>• Enfoque equilibrado hacia la vida social</li>
            </ul>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Para un análisis completo y recomendaciones personalizadas, descarga el reporte premium.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
