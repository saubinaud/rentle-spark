// src/pages/Results.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopMatches } from "@/lib/matchesApi";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Tipo que define la estructura de datos para un elemento de match
 * Incluye información básica del perfil y datos de compatibilidad
 */
type MatchCardItem = {
  id: string;
  name: string;
  university: string;
  photoUrl?: string;
  score: number; // 0..1
  explanation_short?: string;
};

/**
 * Componente Results - Muestra la lista de matches principales
 * 
 * Este componente permite visualizar y gestionar los matches con mayor compatibilidad,
 * proporcionando una interfaz para navegar a perfiles individuales y generar nuevas comparaciones.
 * Integra autenticación y manejo de estados de carga y error.
 * 
 * @returns {JSX.Element} Interfaz de resultados con lista de matches y controles
 */
export default function Results() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // Estados para manejo de UI y datos
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<MatchCardItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const email = user?.email || "";

  /**
   * Carga los matches desde la API
   * Maneja autenticación, normalización de datos y ordenamiento
   */
  const loadMatches = async () => {
    if (!email) {
      setError("No hay email de usuario. Inicia sesión o completa el onboarding.");
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      // getTopMatches devuelve [{ user, compatibility }]
      const data = await getTopMatches(email, 0.94, 10);
      const normalized: MatchCardItem[] = data.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        university: m.user.university,
        photoUrl: m.user.photoUrl,
        score: Math.max(0, Math.min(1, (m.compatibility || 0) / 100)),
        explanation_short: (m as any).explanation_short,
      }));
      
      // Ordena desc por score por si el backend no viene ordenado
      normalized.sort((a, b) => b.score - a.score);
      setList(normalized);
    } catch (e: any) {
      setError(e?.message || "No se pudieron obtener los matches.");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para carga inicial
  useEffect(() => {
    loadMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-2xl" id="results-title">
          Tus mejores matches
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/me")}
            variant="secondary"
            aria-label="Ver mi perfil"
          >
            Mi perfil
          </Button>
          <Button
            disabled={loading}
            onClick={loadMatches}
            aria-describedby="refresh-help"
          >
            {loading ? "Calculando..." : "Generar nueva comparación"}
          </Button>
          <div className="sr-only" id="refresh-help">
            Recalcula los matches basándose en los datos más recientes
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {/* Main Content */}
      <main aria-labelledby="results-title">
        {loading ? (
          <LoadingSkeleton />
        ) : list.length === 0 ? (
          <EmptyState label="No hay resultados ≥ 94%. Invita a más personas o inténtalo más tarde." />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((m) => (
              <MatchCard
                key={m.id}
                item={m}
                onClick={() => navigate(`/profile/${m.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * Componente MatchCard - Tarjeta individual de match
 * Muestra información resumida del match con interactividad
 */
function MatchCard({
  item,
  onClick,
}: {
  item: MatchCardItem;
  onClick: () => void;
}) {
  const pct = Math.round(item.score * 100);
  const avatar = item.photoUrl || `https://i.pravatar.cc/120?u=${encodeURIComponent(item.id)}`;

  return (
    <article
      className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver perfil de ${item.name}, ${pct}% de compatibilidad`}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={`Foto de perfil de ${item.name}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{item.name}</div>
          <div className="text-xs text-gray-600">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
              {item.university || "Sin especificar"}
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-sm text-gray-600">Match</div>
          <div className="text-lg font-semibold" aria-label={`${pct} por ciento de compatibilidad`}>
            {pct}%
          </div>
        </div>
      </div>
      
      {!!item.explanation_short && (
        <p className="text-sm text-gray-600 mt-3">
          {item.explanation_short}
        </p>
      )}
      
      <div className="mt-4">
        <div className="px-3 py-2 rounded-xl border hover:bg-gray-50 text-sm">
          Ver perfil
        </div>
      </div>
    </article>
  );
}

/**
 * Componente EmptyState - Estado vacío cuando no hay resultados
 * Proporciona feedback visual y orientación al usuario
 */
function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center" role="status">
      <div 
        className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-3"
        aria-hidden="true"
      ></div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

/**
 * Componente LoadingSkeleton - Skeleton loading para mejor UX
 * Proporciona feedback visual durante la carga de datos
 */
function LoadingSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Cargando resultados...">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="bg-white rounded-2xl shadow p-4" key={i}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" aria-hidden="true"></div>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" aria-hidden="true"></div>
              <div className="mt-2 h-3 bg-gray-100 rounded w-24 animate-pulse" aria-hidden="true"></div>
            </div>
            <div className="w-10 h-6 bg-gray-200 rounded animate-pulse" aria-hidden="true"></div>
          </div>
          <div className="mt-4 h-4 bg-gray-100 rounded animate-pulse" aria-hidden="true"></div>
        </div>
      ))}
    </div>
  );
}
