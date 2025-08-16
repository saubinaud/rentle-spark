
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
        className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold hover:scale-105 transition-transform duration-200"
      >
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-12 right-0 w-48 bg-popover border border-border rounded-2xl shadow-lg z-20 py-2">
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
                className="w-full text-left px-4 py-3 hover:bg-muted flex items-center space-x-3 text-sm"
              >
                <item.icon className="w-4 h-4" />
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
