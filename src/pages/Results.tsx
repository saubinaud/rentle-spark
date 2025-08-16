// src/pages/Results.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopMatches } from "@/lib/matchesApi"; // <- usa servicios (fallback a mock si no hay n8n)
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

type MatchCardItem = {
  id: string;
  name: string;
  university: string;
  photoUrl?: string;
  score: number; // 0..1
  explanation_short?: string;
};

export default function Results() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<MatchCardItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const email = user?.email || "";

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
      // ordena desc por score por si el backend no viene ordenado
      normalized.sort((a, b) => b.score - a.score);
      setList(normalized);
    } catch (e: any) {
      setError(e?.message || "No se pudieron obtener los matches.");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // carga inicial
    loadMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl">Your top matches</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate("/me")}>
            My profile
          </Button>
          <Button onClick={loadMatches} disabled={loading}>
            {loading ? "Calculating..." : "Generate new comparison"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSkeleton />
      ) : list.length === 0 ? (
        <EmptyState label="No results ≥ 94%. Invite more people or try again later." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m) => (
            <Card key={m.id} item={m} onClick={() => navigate(`/profile/${m.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- UI helpers (local, sin dependencias del resto) ---------- */

function Card({
  item,
  onClick,
}: {
  item: MatchCardItem;
  onClick: () => void;
}) {
  const pct = Math.round(item.score * 100);
  return (
    <div
      className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <img
          src={item.photoUrl || `https://i.pravatar.cc/120?u=${encodeURIComponent(item.id)}`}
          alt={item.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="font-medium truncate">{item.name}</div>
          <div className="text-xs text-gray-600">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
              {item.university || "—"}
            </span>
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-sm">Match</div>
          <div className="text-lg font-semibold">{pct}%</div>
        </div>
      </div>
      {!!item.explanation_short && (
        <p className="text-sm text-gray-600 mt-3">{item.explanation_short}</p>
      )}
      <div className="mt-4">
        <button className="px-3 py-2 rounded-xl border hover:bg-gray-50">
          View profile
        </button>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center">
      <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-3" />
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-32" />
              <div className="mt-2 h-3 bg-gray-100 rounded w-24" />
            </div>
            <div className="w-10 h-6 bg-gray-200 rounded" />
          </div>
          <div className="mt-4 h-4 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}
