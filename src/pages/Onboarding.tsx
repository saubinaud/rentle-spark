
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { useProfileStore } from '@/stores/useProfileStore';
import { Upload, User } from 'lucide-react';
import AppHeader from '@/components/AppHeader';

const universities = ['Sorbonne', 'Sciences Po', 'HEC'];

const Onboarding = () => {
  const { user } = useAuthStore();
  const { updateProfile } = useProfileStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: '',
    city: '',
    age: 18,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/form');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold font-title mb-6 text-gradient kerning-tight">
                Completa tu perfil
              </h1>
              <p className="text-muted-foreground text-xl">
                Necesitamos algunos datos básicos para empezar a encontrar tus matches perfectos.
              </p>
            </div>

            <div className="card-elevated">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Photo Upload */}
                <div className="text-center">
                  <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-strong">
                    <User className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <button
                    type="button"
                    className="btn-outline flex items-center space-x-2 mx-auto"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Subir foto de perfil</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-primary">Nombre completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-primary">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-primary">Universidad</label>
                    <select
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Selecciona tu universidad</option>
                      {universities.map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-primary">Ciudad</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Paris"
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-3 text-primary">Edad</label>
                    <select
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      className="input-field"
                      required
                    >
                      {Array.from({ length: 23 }, (_, i) => i + 18).map(age => (
                        <option key={age} value={age}>{age} años</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center pt-8">
                  <button type="submit" className="btn-primary text-lg px-12">
                    Continuar al cuestionario
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
