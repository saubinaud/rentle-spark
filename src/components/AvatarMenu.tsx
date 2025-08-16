
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { User, CreditCard, LogOut } from 'lucide-react';

const AvatarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Mi Perfil', path: '/me' },
    { icon: CreditCard, label: 'Créditos', path: '/credits' },
    { icon: LogOut, label: 'Logout', action: handleLogout },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-2xl gradient-accent text-accent-foreground flex items-center justify-center font-bold hover:scale-105 transition-all duration-200 shadow-medium avatar-ring"
      >
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-16 right-0 w-56 bg-popover border border-border/50 rounded-2xl shadow-strong z-20 py-2 backdrop-blur-md">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.path) {
                    navigate(item.path);
                  }
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-muted/50 flex items-center space-x-3 text-sm transition-all duration-200 font-medium first:rounded-t-2xl last:rounded-b-2xl"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarMenu;
