// src/pages/Credits.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, CreditCard } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCreditStore } from '@/stores/useCreditStore';
import { getCredits, buyCredits } from '@/lib/creditsApi';

// Paquetes (mock/real)
const PACKS = [
  { name: 'Starter', price: '€9.99', credits: 10, features: ['10 comparisons', 'Basic reports'] },
  { name: 'Pro',     price: '€19.99', credits: 25, features: ['Priority processing', 'Premium support'] },
  { name: 'Max',     price: '€39.99', credits: 60, features: ['Premium reports', 'VIP support'] },
];

export default function Credits() {
  const { user } = useAuthStore();
  // usamos el store tal cual viene en tu repo; si añadiste setters, los usamos opcionalmente
  const creditStore = useCreditStore() as any;
  const { freeLeft, paidLeft } = creditStore;

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Sincroniza al entrar (si hay n8n → real; si no → mock)
  useEffect(() => {
    (async () => {
      try {
        const email = user?.email || 'me@example.com';
        const c = await getCredits(email);
        // si actualizaste el store con setCounts, se sincroniza; si no, lo ignoramos
        creditStore?.setCounts?.(c.freeLeft, c.paidLeft);
      } catch {
        // dejamos los valores locales del store
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  async function handleBuy(packCredits: number, label: string) {
    setLoading(true);
    try {
      const email = user?.email || 'me@example.com';
      const c = await buyCredits(email, packCredits); // n8n o mock
      creditStore?.setCounts?.(c.freeLeft, c.paidLeft);
      // respaldo local por si tu store aún no tiene setCounts
      creditStore?.addPaid?.(packCredits);
      showToast(`✅ Purchased ${label} (+${packCredits} credits)!`);
    } catch {
      showToast('⚠️ Could not complete purchase.');
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <AppHeader />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl">Credits</h1>
            <p className="text-muted-foreground">Use credits to unlock comparisons and premium reports.</p>
          </div>
          <div className="bg-white rounded-2xl shadow px-5 py-3">
            <div className="text-sm text-gray-600">Available</div>
            <div className="text-lg font-semibold">{freeLeft} free + {paidLeft} paid</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACKS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">
                  <Sparkles size={18} />
                </div>
                <h3 className="font-serif text-xl">{p.name}</h3>
              </div>

              <div className="text-2xl font-semibold mb-4">{p.price}</div>

              <ul className="text-sm text-gray-700 space-y-2 flex-1">
                <li className="flex items-center gap-2"><Check size={16}/> +{p.credits} credits</li>
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2"><Check size={16}/>{f}</li>
                ))}
              </ul>

              <Button
                className="mt-6 inline-flex items-center gap-2"
                variant="outline"
                onClick={() => handleBuy(p.credits, p.name)}
                disabled={loading}
              >
                <CreditCard size={16}/> {loading ? 'Processing…' : 'Buy'}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Payments are secure (Stripe). Credits never expire and can be used anytime.
          </p>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-black text-white text-sm px-4 py-2 rounded-xl shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
