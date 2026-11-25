import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#242424] flex flex-col items-center justify-center p-8 text-center">
      <span className="font-mono text-xs text-[#FF604A] uppercase tracking-widest font-bold mb-3">
        404 // ERROR
      </span>

      <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-[#181818] mb-4">
        OUT OF BOUNDS.
      </h1>

      <p className="font-sans text-sm sm:text-base text-[#77746F] max-w-md mx-auto mb-8 leading-relaxed">
        The requested digital coordinate does not exist within Reshwanth Reddy's portfolio or project registry.
      </p>

      <MagneticButton variant="primary" onClick={() => navigate('/')}>
        <HomeIcon className="w-4 h-4" />
        <span>Return to Homepage</span>
      </MagneticButton>
    </div>
  );
};
