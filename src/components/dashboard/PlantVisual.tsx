import React from 'react';

const STAGES = ['🌰', '🌱', '🌿', '🪴', '🌳'];
const NAMES = ['Seed', 'Sprout', 'Seedling', 'Young Plant', 'Mature Plant'];

interface Props {
  stage: number;
  streak: number;
}

const PlantVisual: React.FC<Props> = ({ stage, streak }) => {
  const s = Math.min(Math.max(stage, 0), 4);
  
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#ede8df] text-center">
      <div className="text-6xl mb-3">{STAGES[s]}</div>
      <h3 className="font-semibold text-[#1a2a2a] text-lg">{NAMES[s]}</h3>
      <div className="mt-3 flex justify-center gap-1">
        {[0,1,2,3,4].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i <= s ? 'bg-[#1B6B6B]' : 'bg-[#ede8df]'}`} />
        ))}
      </div>
      <p className="text-xs text-[#4a5e5e] mt-2">
        {streak < 4 ? `${4 - streak} days to Sprout` :
         streak < 8 ? `${8 - streak} days to Seedling` :
         streak < 15 ? `${15 - streak} days to Young Plant` :
         streak < 30 ? `${30 - streak} days to Mature Plant` :
         'Mature Plant — Alumni at 90 days'}
      </p>
    </div>
  );
};

export default PlantVisual;
