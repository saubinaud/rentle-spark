
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
              <h1 className="text-4xl font-bold font-title mb-4">Completa tu perfil</h1>
              <p className="text-muted-foreground text-lg">
                Necesitamos algunos datos básicos para empezar a encontrar tus matches.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Photo Upload */}
              <div className="text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-accent" />
                </div>
                <button
                  type="button"
                  className="btn-secondary flex items-center space-x-2 mx-auto"
                >
                  <Upload className="w-4 h-4" />
                  <span>Subir foto</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="input-field bg-muted text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Universidad</label>
                  <select
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="">Selecciona una universidad</option>
                    {universities.map(uni => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ciudad</label>
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
                  <label className="block text-sm font-medium mb-2">Edad</label>
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
                <button type="submit" className="btn-primary">
                  Continue
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
