
import { motion } from 'framer-motion';
import { useCreditStore } from '@/stores/useCreditStore';
import AppHeader from '@/components/AppHeader';
import { CreditCard, Sparkles, Check } from 'lucide-react';

const Credits = () => {
  const { freeLeft, paidLeft } = useCreditStore();

  const plans = [
    {
      name: 'Starter',
      price: '€9.99',
      credits: 10,
      features: ['10 nuevas comparaciones', 'Reportes básicos', 'Matches ilimitados']
    },
    {
      name: 'Premium',
      price: '€19.99',
      credits: 25,
      features: ['25 nuevas comparaciones', 'Reportes premium', 'Análisis detallado', 'Soporte prioritario'],
      popular: true
    },
    {
      name: 'Unlimited',
      price: '€39.99',
      credits: 'unlimited',
      features: ['Comparaciones ilimitadas', 'Todos los reportes', 'Funciones beta', 'Consultoría personal']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <div className="pt-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-title mb-4">Gestiona tus Créditos</h1>
              <p className="text-muted-foreground text-lg">
                Usa créditos para generar nuevas comparaciones y descubrir más matches compatibles.
              </p>
            </div>

            {/* Current Credits */}
            <div className="card-interactive max-w-md mx-auto mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-accent" />
                </div>
                
                <h2 className="text-2xl font-semibold mb-2">Créditos Actuales</h2>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="text-2xl font-bold text-accent">{freeLeft}</div>
                    <div className="text-sm text-muted-foreground">Gratuitos</div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <div className="text-2xl font-bold text-accent">{paidLeft}</div>
                    <div className="text-sm text-muted-foreground">Premium</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Initial Credit Info */}
            <div className="bg-accent/5 border-2 border-accent/20 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">¡Empiezas con 3 créditos gratuitos!</h3>
                  <p className="text-muted-foreground text-sm">
                    Cada crédito te permite generar una nueva comparación con hasta 10 matches compatibles. 
                    Una vez que uses tus créditos gratuitos, puedes comprar más para continuar descubriendo conexiones.
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={`card-interactive relative ${plan.popular ? 'ring-2 ring-accent ring-opacity-50' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.credits !== 'unlimited' && (
                        <span className="text-muted-foreground ml-2">/ {plan.credits} créditos</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                    Comprar Créditos
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground text-sm">
                Todos los pagos son seguros y procesados a través de Stripe. 
                Los créditos no expiran y se pueden usar en cualquier momento.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
