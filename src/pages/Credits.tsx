// src/pages/Credits.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppHeader from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, CreditCard } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCreditStore } from '@/stores/useCreditStore';
import { getCredits, buyCredits } from '@/lib/creditsApi';

// Definición de paquetes de créditos disponibles
const PACKS = [
  {
    name: 'Starter',
    price: '€9.99',
    credits: 10,
    features: ['10 comparisons', 'Basic reports']
  },
  {
    name: 'Pro',
    price: '€19.99',
    credits: 25,
    features: ['25 comparisons', 'Priority processing', 'Premium support']
  },
  {
    name: 'Max',
    price: '€39.99',
    credits: 60,
    features: ['60 comparisons', 'Premium reports', 'VIP support']
  },
];

/**
 * Componente Credits - Página para comprar y gestionar créditos
 * Permite a los usuarios ver su saldo actual y comprar paquetes de créditos
 */
export default function Credits() {
  const { user } = useAuthStore();
  const creditStore = useCreditStore();
  const { freeLeft, paidLeft } = creditStore;
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /**
   * Sincroniza los créditos al cargar la página
   * Obtiene el estado actual desde la API (o mock si no está disponible)
   */
  useEffect(() => {
    const syncCredits = async () => {
      try {
        const email = user?.email || 'me@example.com';
        const credits = await getCredits(email);
        
        // Actualiza el store si los métodos están disponibles
        if (creditStore.setCounts) {
          creditStore.setCounts(credits.freeLeft, credits.paidLeft);
        }
      } catch (error) {
        // Si falla la sincronización, mantenemos los valores locales
        console.warn('Failed to sync credits:', error);
      }
    };

    syncCredits();
  }, [user?.email, creditStore]);

  /**
   * Maneja la compra de paquetes de créditos
   * @param packCredits - Número de créditos a comprar
   * @param label - Nombre del paquete para mostrar en mensajes
   */
  async function handleBuy(packCredits: number, label: string) {
    setLoading(true);
    
    try {
      const email = user?.email || 'me@example.com';
      const updatedCredits = await buyCredits(email, packCredits);
      
      // Actualiza el store con los nuevos valores
      if (creditStore.setCounts) {
        creditStore.setCounts(updatedCredits.freeLeft, updatedCredits.paidLeft);
      }
      
      // Respaldo local opcional si el método está disponible
      if (creditStore.addPaid) {
        creditStore.addPaid(packCredits);
      }
      
      showToast(`✅ Purchased ${label} (+${packCredits} credits)!`);
    } catch (error) {
      console.error('Purchase failed:', error);
      showToast('⚠️ Could not complete purchase.');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Muestra un mensaje toast temporal
   * @param message - Mensaje a mostrar
   */
  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <AppHeader />
      
      {/* Contenido principal con espacio para el header sticky */}
      <main className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Encabezado de la página */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl">Credits</h1>
              <p className="text-muted-foreground">
                Use credits to unlock comparisons and premium reports.
              </p>
            </div>
            
            {/* Contador de créditos disponibles */}
            <div className="bg-white rounded-2xl shadow px-5 py-3">
              <div className="text-sm text-gray-600">Available</div>
              <div className="text-lg font-semibold">
                {freeLeft} free + {paidLeft} paid
              </div>
            </div>
          </div>
          
          {/* Grid de paquetes de créditos */}
          <div className="grid md:grid-cols-3 gap-6">
            {PACKS.map((pack, index) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow p-6 flex flex-col"
              >
                {/* Encabezado del paquete */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="font-serif text-xl">{pack.name}</h3>
                </div>
                
                {/* Precio */}
                <div className="text-2xl font-semibold mb-4">{pack.price}</div>
                
                {/* Lista de características */}
                <ul className="text-sm text-gray-700 space-y-2 flex-1">
                  <li className="flex items-center gap-2">
                    <Check size={16} /> +{pack.credits} credits
                  </li>
                  {pack.features.map((feature) => (
                    <li className="flex items-center gap-2" key={feature}>
                      <Check size={16} /> {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Botón de compra */}
                <Button
                  className="mt-6 inline-flex items-center gap-2"
                  variant="outline"
                  onClick={() => handleBuy(pack.credits, pack.name)}
                  disabled={loading}
                >
                  <CreditCard size={16} />
                  {loading ? 'Processing…' : 'Buy'}
                </Button>
              </motion.div>
            ))}
          </div>
          
          {/* Información adicional */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              Payments are secure (Stripe). Credits never expire and can be used anytime.
            </p>
          </div>
        </div>
      </main>
      
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-black text-white text-sm px-4 py-2 rounded-xl shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
