
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, GraduationCap, Heart, Sparkles } from 'lucide-react';

interface Match {
  id: string;
  name: string;
  university: string;
  photo: string;
  compatibility: number;
  teaser: string;
  age: number;
  city: string;
}

interface ModernMatchCardProps {
  match: Match;
  index: number;
}

const ModernMatchCard = ({ match, index }: ModernMatchCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="card-match group"
      onClick={() => navigate(`/profile/${match.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Header with photo placeholder and compatibility */}
      <div className="relative h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold shadow-strong">
          {match.name.charAt(0)}
        </div>
        
        {/* Compatibility badge */}
        <div className="absolute top-4 right-4 match-compatibility">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">{match.compatibility}%</span>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold font-title mb-2 kerning-tight group-hover:text-primary transition-colors duration-300">
            {match.name}
          </h3>
          
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-primary" />
              <span>{match.age} años</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{match.city}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span>{match.university}</span>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed text-sm mb-4">
          {match.teaser}
        </p>

        {/* Action hint */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Ver perfil completo</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernMatchCard;
