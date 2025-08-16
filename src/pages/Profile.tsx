
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMatchStore } from '@/stores/useMatchStore';
import AppHeader from '@/components/AppHeader';
import Breadcrumb from '@/components/Breadcrumb';
import Modal from '@/components/Modal';
import { MapPin, GraduationCap, Heart, Eye, Download, Sparkles } from 'lucide-react';

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
          <h1 className="text-3xl font-bold mb-6 font-title">Perfil no encontrado</h1>
          <button onClick={() => navigate('/results')} className="btn-primary">
            Volver a matches
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Matches', path: '/results' },
    { label: profile.name }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Main */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header Card */}
                <div className="card-elevated">
                  <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8">
                    <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center text-primary-foreground font-bold text-4xl shadow-strong mx-auto sm:mx-0">
                      {profile.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                        <h1 className="text-4xl font-bold font-title kerning-tight">{profile.name}</h1>
                        <div className="match-compatibility mt-2 sm:mt-0">
                          <div className="flex items-center space-x-1">
                            <Sparkles className="w-4 h-4" />
                            <span>{profile.compatibility}% match</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-muted-foreground mb-6">
                        <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-xl">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          <span className="font-medium">{profile.university}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-xl">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">{profile.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-xl">
                          <Heart className="w-4 h-4 text-primary" />
                          <span className="font-medium">{profile.age} años</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {profile.teaser}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personality Card */}
                <div className="card-elevated">
                  <h2 className="text-2xl font-bold font-title mb-6 text-gradient">Personalidad</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                      <div className="text-sm text-primary font-semibold mb-2">TIPO MBTI</div>
                      <div className="font-bold text-2xl text-primary">{profile.mbti}</div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
                      <div className="text-sm text-secondary font-semibold mb-2">SIGNO ZODIACAL</div>
                      <div className="font-bold text-2xl text-secondary">{profile.zodiac}</div>
                    </div>
                  </div>
                </div>

                {/* Compatibility Summary */}
                <div className="card-elevated">
                  <h2 className="text-2xl font-bold font-title mb-6 text-gradient">Análisis de Compatibilidad</h2>
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Tienes una <strong className="text-primary">alta compatibilidad del {profile.compatibility}%</strong> con {profile.name} basada en sus respuestas del Big Five y MBTI. 
                      Ambos comparten valores similares en apertura a experiencias y consciencia. 
                      Sus personalidades se complementan muy bien, especialmente en aspectos sociales y de comunicación.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Sidebar */}
              <div className="space-y-8">
                {/* Actions Card */}
                <div className="card-elevated">
                  <h3 className="font-bold text-xl mb-6 font-title">Acciones</h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full btn-outline flex items-center justify-center space-x-3"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Ver comparación gratuita</span>
                    </button>
                    
                    <button className="w-full btn-primary flex items-center justify-center space-x-3">
                      <Download className="w-5 h-5" />
                      <span>Descargar reporte premium</span>
                    </button>
                  </div>
                </div>

                {/* Detailed Compatibility */}
                <div className="card-elevated">
                  <h3 className="font-bold text-xl mb-6 font-title">Compatibilidad Detallada</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Comunicación', value: 90 },
                      { label: 'Valores', value: 85 },
                      { label: 'Intereses', value: 78 }
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{item.label}</span>
                          <span className="font-bold text-primary">{item.value}%</span>
                        </div>
                        <div className="progress-bar">
                          <motion.div 
                            className="progress-fill" 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
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
        <div className="space-y-6">
          <p className="text-muted-foreground text-lg">
            <strong className="text-primary">{profile.name}</strong> y tú comparten una alta compatibilidad del <strong className="text-primary">{profile.compatibility}%</strong>.
          </p>
          
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
            <h4 className="font-bold mb-4 text-primary">Puntos en común:</h4>
            <ul className="text-muted-foreground space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Ambos valoran la comunicación profunda</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Intereses similares en arte y cultura</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Enfoque equilibrado hacia la vida social</span>
              </li>
            </ul>
          </div>
          
          <p className="text-xs text-muted-foreground bg-muted/20 p-4 rounded-xl">
            Para un análisis completo y recomendaciones personalizadas, descarga el reporte premium.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
