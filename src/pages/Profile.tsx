import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMatchStore } from "@/stores/useMatchStore";
import { useCreditStore } from "@/stores/useCreditStore";
import { requestFreeSummary } from "@/lib/summaryApi";

/**
 * Tipo que define la estructura de datos para un elemento de match
 * Incluye información básica del perfil y datos de compatibilidad
 */
type MatchCardItem = {
  id: string;
  name: string;
  university: string;
  photo?: string;
  photoUrl?: string;
  compatibility?: number; // 0..100 si viene del mock store
  score?: number;         // 0..1 si viene de la nueva Results
  teaser?: string;
};

/**
 * Componente Profile - Muestra el perfil detallado de un match
 * 
 * Este componente permite visualizar información detallada de un match específico,
 * incluyendo compatibilidad, datos personales y la opción de generar comparaciones.
 * Integra el sistema de créditos para funcionalidades premium.
 * 
 * @returns {JSX.Element} Interfaz de perfil con información del match y opciones de interacción
 */
export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { matches } = useMatchStore();
  const { freeLeft, paidLeft, consumeOne } = useCreditStore();
  
  // Estados para manejo de UI y datos
  const [loading, setLoading] = useState(false);
  const [miniText, setMiniText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMini, setShowMini] = useState(false);

  // Encuentra el item correspondiente al ID en la URL
  const item: MatchCardItem | undefined = useMemo(() => {
    return (matches as any[]).find((m) => m.id === id) || (matches as any[])[0];
  }, [matches, id]);

  // Redirige si no se encuentra el item
  useEffect(() => {
    if (!item) navigate("/results");
  }, [item, navigate]);

  // Calcula el score normalizado para mostrar porcentaje de compatibilidad
  const normalizedScore = (() => {
    if (!item) return 0;
    if (typeof item.score === "number") return Math.max(0, Math.min(1, item.score));
    if (typeof item.compatibility === "number") return Math.max(0, Math.min(1, item.compatibility / 100));
    return 0;
  })();

  /**
   * Maneja la solicitud de comparación gratuita
   * Verifica créditos disponibles y ejecuta la consulta a la API
   */
  async function handleFreeComparison() {
    if (!item) return;
    
    if (!user?.email) {
      setError("No hay sesión de usuario activa. Por favor, inicia sesión.");
      return;
    }
    
    if (freeLeft <= 0 && paidLeft <= 0) {
      setError("No tienes créditos disponibles. Por favor, compra más.");
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      const res = await requestFreeSummary(user.email, item.id);
      setMiniText(res.text || "");
      setShowMini(true);
      // Consume un crédito del store
      consumeOne();
    } catch (e: any) {
      setError(e?.message || "No se pudo obtener la comparación.");
    } finally {
      setLoading(false);
    }
  }

  // Maneja el caso cuando no se encuentra el match
  if (!item) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <EmptyState label="Match no encontrado" />
      </div>
    );
  }

  const pct = Math.round(normalizedScore * 100);
  const avatar = item.photoUrl || item.photo || `https://i.pravatar.cc/160?u=${encodeURIComponent(item.id)}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex items-center gap-4" role="banner">
        <img 
          src={avatar}
          alt={`Foto de perfil de ${item.name}`}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="font-serif text-2xl" id="profile-title">
            {item.name}
          </h1>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
              {item.university || "Sin especificar"}
            </span>
            <span aria-hidden="true">•</span>
            <span aria-label={`${pct} por ciento de compatibilidad`}>
              {pct}% compatibilidad
            </span>
          </div>
        </div>
        <div className="ml-auto">
          <Button 
            onClick={() => navigate("/results")} 
            variant="secondary"
            aria-label="Volver a resultados"
          >
            ← Volver a resultados
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6 mt-6" role="main" aria-labelledby="profile-title">
        {/* Left Column - About and Free Comparison */}
        <div className="md:col-span-2">
          {/* About Section */}
          <section className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-serif text-lg mb-2">Acerca de</h2>
            <p className="text-sm text-gray-700">
              Esta persona disfruta de rutinas equilibradas, le gustan los espacios ordenados
              y se comunica con empatía. Una buena opción para compañeros de piso proactivos
              y respetuosos.
            </p>
          </section>

          {/* Free Comparison Section */}
          <section className="bg-white rounded-2xl shadow p-5 mt-4">
            <h2 className="font-serif text-lg mb-2">Comparación gratuita</h2>
            <p className="text-sm text-gray-600">
              Te quedan {freeLeft} créditos gratuitos
              {paidLeft > 0 && (
                <span> + {paidLeft} de pago</span>
              )}.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                disabled={loading || (freeLeft <= 0 && paidLeft <= 0)}
                onClick={handleFreeComparison}
                aria-describedby="comparison-help"
              >
                {loading ? "Generando..." : "Ver comparación gratuita"}
              </Button>
              <Button 
                onClick={() => navigate("/credits")} 
                variant="outline"
                aria-label="Comprar más créditos"
              >
                Comprar más
              </Button>
            </div>
            <div id="comparison-help" className="sr-only">
              Genera una comparación de compatibilidad usando uno de tus créditos disponibles
            </div>
            {error && (
              <div 
                className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}
          </section>
        </div>

        {/* Right Column - Details */}
        <aside className="bg-white rounded-2xl shadow p-5">
          <h2 className="font-serif text-lg mb-2">Detalles</h2>
          <dl className="text-sm text-gray-700 space-y-1">
            <div>
              <dt className="inline font-medium">MBTI:</dt>
              <dd className="inline ml-1">ENTP (ejemplo)</dd>
            </div>
            <div>
              <dt className="inline font-medium">Big Five:</dt>
              <dd className="inline ml-1">A alto, C medio, E medio, Am alto, N bajo (ejemplo)</dd>
            </div>
            <div>
              <dt className="inline font-medium">Signo:</dt>
              <dd className="inline ml-1">Leo (ejemplo)</dd>
            </div>
          </dl>
          <Button 
            className="mt-4 w-full" 
            variant="outline"
            disabled
            aria-describedby="premium-help"
          >
            Descargar reporte premium (próximamente)
          </Button>
          <div id="premium-help" className="sr-only">
            Funcionalidad de reporte premium en desarrollo
          </div>
        </aside>
      </div>

      {/* Mini Comparison Modal */}
      {showMini && (
        <Modal 
          onClose={() => setShowMini(false)} 
          title="Comparación rápida"
        >
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {miniText || "Sin contenido disponible"}
          </p>
        </Modal>
      )}
    </div>
  );
}

/**
 * Componente para mostrar estados vacíos
 * Proporciona feedback visual cuando no hay contenido disponible
 */
function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center" role="status">
      <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-3" aria-hidden="true"></div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

/**
 * Componente Modal reutilizable
 * Proporciona una interfaz modal accesible con manejo de foco
 */
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Manejo de tecla Escape para cerrar modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/30" 
        onClick={onClose}
        aria-label="Cerrar modal"
      ></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
          <div className="flex items-center justify-between">
            <h3 id="modal-title" className="font-serif text-lg">
              {title}
            </h3>
            <button 
              className="w-8 h-8 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
