
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Match {
  id: string;
  name: string;
  university: string;
  photo: string;
  compatibility: number;
  teaser: string;
}

interface MatchCardProps {
  match: Match;
  index: number;
}

const MatchCard = ({ match, index }: MatchCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="card-interactive cursor-pointer"
      onClick={() => navigate(`/profile/${match.id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center text-accent font-bold text-xl">
          {match.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">{match.name}</h3>
            <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              {match.compatibility}% match
            </div>
          </div>
          
          <div className="mb-2">
            <span className="inline-block bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
              {match.university}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed">
            {match.teaser}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MatchCard;
