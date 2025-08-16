// src/pages/Profile.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMatchStore } from "@/stores/useMatchStore";
import { useCreditStore } from "@/stores/useCreditStore";
import { requestFreeSummary } from "@/lib/summaryApi";

type MatchCardItem = {
  id: string;
  name: string;
  university: string;
  photoUrl?: string;
  score: number; // 0..1
};

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { matches } = useMatchStore();
  const { freeCredits, paidCredits, setFreeCredits, setPaidCredits } = useCreditStore();

  const [loading, setLoading] = useState(false);
  const [miniText, setMiniText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMini, setShowMini] = useState(false);

  // Busca el match por id (cae al primero si no lo encuentra)
  const item: MatchCardItem | undefined = useMemo(() => {
    return (matches as any[]).find((m) => m.id === id) || (matches as any[])[0];
  }, [matches, id]);

  useEffect(() => {
    if (!item) {
      // Si no hay item, vuelve a resultados
      navigate("/results");
    }
  }, [item, navigate]);

  async function handleFreeComparison() {
    if (!item) return;
    if (!user?.email) {
      setError("No user session. Please log in.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await requestFreeSummary(user.email, item.id);
      setMiniText(res.text || "");
      setShowMini(true);

      // Intenta actualizar la store de créditos si existen los setters
      try {
        if (typeof setFreeCredits === "function") setFreeCredits(res.credits_left.freeLeft);
        if (typeof setPaidCredits === "function") setPaidCredits(res.credits_left.paidLeft);
      } catch {
        // no-op si no existen acciones
      }
    } catch (e: any) {
      setError(e?.message || "Could not fetch comparison.");
    } finally {
      setLoading(false);
    }
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <EmptyState label="Match not found" />
      </div>
    );
  }

  const pct = Math.round(item.score * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <img
          src={item.photoUrl || `https://i.pravatar.cc/160?u=${encodeURIComponent(item.id)}`}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="font-serif text-2xl">{item.name}</h2>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
              {item.university || "—"}
            </span>
            <span>•</span>
            <span>{pct}% match</span>
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="secondary" onClick={() => navigate("/results")}>
            ← Back to results
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-serif text-lg mb-2">About</h3>
            <p className="text-sm text-gray-700">
              {/* Texto público corto (cuando lo generemos de verdad, vendrá de la DB) */}
              This person enjoys balanced routines, likes tidy spaces and communicates with empathy.
              A good match for proactive and respectful roomies.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 mt-4">
            <h3 className="font-serif text-lg mb-2">Free comparison</h3>
            <p className="text-sm text-gray-600">
              You have <strong>{freeCredits}</strong> free credits left.
            </p>
            <div className="mt-3 flex gap-2">
              <Button onClick={handleFreeComparison} disabled={loading || freeCredits <= 0}>
                {loading ? "Generating..." : "View free comparison"}
              </Button>
              <Button variant="outline" onClick={() => navigate("/credits")}>
                Buy more
              </Button>
            </div>
            {error && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="font-serif text-lg mb-2">Details</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>MBTI: ENTP (mock)</li>
            <li>Big Five: O high, C mid, E mid, A high, N low (mock)</li>
            <li>Zodiac: Leo (mock)</li>
          </ul>
          <Button className="mt-4 w-full" variant="outline">
            Download premium report (stub)
          </Button>
        </div>
      </div>

      {/* Modal mini análisis */}
      {showMini && (
        <Modal title="Mini comparison" onClose={() => setShowMini(false)}>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {miniText || "No content"}
          </p>
        </Modal>
      )}
    </div>
  );
}

/* ---------- UI helpers locales ---------- */

function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center">
      <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-3" />
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-lg">{title}</h4>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100">
              ✕
            </button>
          </div>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
