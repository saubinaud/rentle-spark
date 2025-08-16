
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <motion.nav
      className="breadcrumb mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleClick('/')}
          className="breadcrumb-item flex items-center space-x-1"
        >
          <Home className="w-4 h-4" />
          <span>Inicio</span>
        </button>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 breadcrumb-separator" />
            <button
              onClick={() => handleClick(item.path)}
              className={`breadcrumb-item ${!item.path ? 'cursor-default' : ''}`}
              disabled={!item.path}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;
