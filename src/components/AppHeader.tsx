
import { useAuthStore } from '@/stores/useAuthStore';
import { useCreditStore } from '@/stores/useCreditStore';
import AvatarMenu from './AvatarMenu';

const AppHeader = () => {
  const { user } = useAuthStore();
  const { freeLeft, paidLeft } = useCreditStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold font-title">Rentle</h1>
          {user && (
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Credits:</span>
              <span className="font-semibold text-foreground">{freeLeft + paidLeft}</span>
            </div>
          )}
        </div>
        
        {user && <AvatarMenu />}
      </div>
    </header>
  );
};

export default AppHeader;
