import {
  loadLocalProfile,
  saveLocalProfile,
  // clearLocalProfile,   // lo dejamos importable por si luego agregas "Reset"
  // defaultProfile,
  buildSubmitPayload,
  type LocalProfile,
} from "@/lib/localProfile";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { Upload, User } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const universities = ["Sorbonne", "Sciences Po", "HEC"];

/**
 * Tipo local para el formulario de este paso (datos básicos)
 * Define la estructura de datos básicos necesarios para el onboarding
 */
type FormBasics = {
  name: string;
  email: string;
  university: string;
  city: string;
  age: number;
};

/**
 * Componente Onboarding - Formulario de registro inicial
 * 
 * Este componente maneja la recopilación de datos básicos del usuario
 * incluyendo nombre, email, universidad, ciudad y edad.
 * Los datos se persisten automáticamente en localStorage.
 * 
 * @returns {JSX.Element} Formulario de onboarding con validación y navegación
 */
const Onboarding = () => {
  const { user } = useAuthStore();
  const { updateProfile } = useProfileStore();
  const navigate = useNavigate();

  // 1) Cargamos lo que ya exista en localStorage
  const initialLocal: LocalProfile = useMemo(() => loadLocalProfile(), []);

  // 2) Construimos el estado inicial del formulario mezclando user + localStorage
  const [formData, setFormData] = useState<FormBasics>(() => ({
    name: (initialLocal.name || user?.name || "").trim(),
    email: (initialLocal.email || user?.email || "").trim(),
    university: initialLocal.university || "",
    city: initialLocal.city || "",
    age:
      typeof initialLocal.age === "number" && initialLocal.age >= 16
        ? initialLocal.age
        : 18,
  }));

  // 3) Persistimos automáticamente al cambiar formData
  useEffect(() => {
    // leemos el perfil local actual para no pisar otras partes (fg/big5/etc.) que se llenarán en /form
    const current = loadLocalProfile();
    const next: LocalProfile = {
      ...current,
      step: 0, // estamos en Onboarding (paso 0 de todo el flujo)
      name: formData.name,
      email: formData.email,
      university: formData.university,
      city: formData.city,
      age: formData.age,
    };
    saveLocalProfile(next);
  }, [formData]);

  /**
   * Maneja el envío del formulario de onboarding
   * Actualiza el store del perfil y navega al siguiente paso
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.university || !formData.city.trim()) {
      return;
    }

    // Actualizas tu store actual (como ya hacías)
    updateProfile(formData);

    // (Opcional) si quieres ver el payload unificado que luego irá a n8n:
    // const local = loadLocalProfile();
    // console.log("[Onboarding] payload listo:", buildSubmitPayload(local));

    // Sigues a tu cuestionario (/form)
    navigate("/form");
  };

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado local del formulario
   */
  const handleInputChange = (field: keyof FormBasics, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value as never }));
  };

  /**
   * Maneja la subida de foto de perfil
   * TODO: Implementar funcionalidad de subida de archivos
   */
  const handlePhotoUpload = () => {
    // TODO: Implementar subida de foto
    console.log("Photo upload functionality to be implemented");
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
            role="main"
            aria-labelledby="onboarding-title"
          >
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 
                id="onboarding-title"
                className="text-5xl font-bold font-title mb-6 text-gradient kerning-tight"
              >
                Completa tu perfil
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-xl mx-auto">
                Necesitamos algunos datos básicos para empezar a encontrar tus
                matches perfectos.
              </p>
            </div>

            {/* Form Card */}
            <div className="card-elevated">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Photo Upload Section */}
                <div className="text-center">
                  <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-strong">
                    <User 
                      className="w-16 h-16 text-primary-foreground" 
                      aria-hidden="true"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handlePhotoUpload}
                    className="btn-outline flex items-center space-x-2 mx-auto transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                    aria-label="Subir foto de perfil"
                  >
                    <Upload className="w-5 h-5" aria-hidden="true" />
                    <span>Subir foto de perfil</span>
                  </button>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nombre completo */}
                  <div>
                    <label 
                      htmlFor="name-input"
                      className="block text-sm font-semibold mb-3 text-primary"
                    >
                      Nombre completo *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="input-field"
                      placeholder="Tu nombre completo"
                      required
                      aria-describedby="name-help"
                    />
                    <div id="name-help" className="sr-only">
                      Ingresa tu nombre completo como aparece en tus documentos
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="email-input"
                      className="block text-sm font-semibold mb-3 text-primary"
                    >
                      Email *
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="input-field"
                      placeholder="tu@email.com"
                      required
                      aria-describedby="email-help"
                    />
                    <div id="email-help" className="sr-only">
                      Dirección de email válida para comunicarnos contigo
                    </div>
                  </div>

                  {/* Universidad */}
                  <div>
                    <label 
                      htmlFor="university-select"
                      className="block text-sm font-semibold mb-3 text-primary"
                    >
                      Universidad *
                    </label>
                    <select
                      id="university-select"
                      value={formData.university}
                      onChange={(e) =>
                        handleInputChange("university", e.target.value)
                      }
                      className="input-field"
                      required
                      aria-describedby="university-help"
                    >
                      <option value="" disabled>
                        Selecciona tu universidad
                      </option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                    <div id="university-help" className="sr-only">
                      Selecciona la universidad donde estudias actualmente
                    </div>
                  </div>

                  {/* Ciudad */}
                  <div>
                    <label 
                      htmlFor="city-input"
                      className="block text-sm font-semibold mb-3 text-primary"
                    >
                      Ciudad *
                    </label>
                    <input
                      id="city-input"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="París"
                      className="input-field"
                      required
                      aria-describedby="city-help"
                    />
                    <div id="city-help" className="sr-only">
                      Ciudad donde vives actualmente
                    </div>
                  </div>

                  {/* Edad */}
                  <div className="md:col-span-2">
                    <label 
                      htmlFor="age-select"
                      className="block text-sm font-semibold mb-3 text-primary"
                    >
                      Edad *
                    </label>
                    <select
                      id="age-select"
                      value={formData.age}
                      onChange={(e) =>
                        handleInputChange("age", parseInt(e.target.value))
                      }
                      className="input-field max-w-xs"
                      required
                      aria-describedby="age-help"
                    >
                      {Array.from({ length: 23 }, (_, i) => i + 18).map(
                        (age) => (
                          <option key={age} value={age}>
                            {age} años
                          </option>
                        )
                      )}
                    </select>
                    <div id="age-help" className="sr-only">
                      Tu edad actual (debe ser mayor de 18 años)
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <button 
                    className="btn-primary text-lg px-12 py-3 rounded-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
                    type="submit"
                    aria-label="Continuar al cuestionario de personalidad"
                  >
                    Continuar al cuestionario
                  </button>
                </div>

                {/* Required fields note */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    * Campos obligatorios
                  </p>
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
