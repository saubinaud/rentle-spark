
import { useAuthStore } from '@/stores/useAuthStore';
import { useCreditStore } from '@/stores/useCreditStore';
import AvatarMenu from './AvatarMenu';

const AppHeader = () => {
  const { user } = useAuthStore();
  const { freeLeft, paidLeft } = useCreditStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold font-title text-gradient kerning-tight">Rentle</h1>
          {user && (
            <div className="hidden md:flex items-center space-x-3 bg-muted/30 px-4 py-2 rounded-xl border border-border/50">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle"></div>
              <span className="text-sm font-medium text-muted-foreground">Credits:</span>
              <span className="font-bold text-primary">{freeLeft + paidLeft}</span>
            </div>
          )}
        </div>
        
        {user && <AvatarMenu />}
      </div>
    </header>
  );
};

export default AppHeader;
