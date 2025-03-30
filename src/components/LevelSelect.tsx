import React from 'react';
import { Level } from '@/constants/levels';

type LevelSelectProps = {
  levels: Level[];
  currentLevel: number;
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
};

const LevelSelect: React.FC<LevelSelectProps> = ({
  levels,
  currentLevel,
  completedLevels,
  onSelectLevel,
}) => {
  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-4 text-center text-purple-800">Challenge Levels</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {levels.map((level) => {
          const isCompleted = completedLevels.includes(level.id);
          const isActive = currentLevel === level.id;
          const isLocked = !isCompleted && level.id > Math.min(Math.max(...completedLevels, 0) + 1, levels.length);
          
          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className={`level-card backdrop-blur-sm ${
                isActive
                  ? 'level-card-active'
                  : isCompleted
                  ? 'level-card-completed'
                  : isLocked
                  ? 'level-card-locked'
                  : 'bg-white border-purple-200 hover:bg-purple-50'
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    {level.id}
                  </div>
                  <span className="font-medium text-purple-800">{level.name}</span>
                </div>
                
                {isCompleted && (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {isLocked && (
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
              </div>
              
              {level.defenses.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {level.defenses.length > 0 && (
                      <div className="w-full bg-gray-100 rounded-lg h-1.5">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-lg" 
                          style={{ width: `${(level.defenses.length / 7) * 100}%` }}
                        ></div>
                      </div>
                    )}
                    <p className="w-full text-xs text-gray-500 mt-1">
                      Difficulty: {level.defenses.length === 0 ? 'Beginner' : 
                                  level.defenses.length < 3 ? 'Easy' :
                                  level.defenses.length < 5 ? 'Medium' :
                                  level.defenses.length < 7 ? 'Hard' : 'Extreme'}
                    </p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect; 