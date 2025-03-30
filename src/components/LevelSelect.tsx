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
  // Icon mapping for each level
  const levelIcons = {
    1: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.967 21.677a.998.998 0 0 1-1.934 0l-.968-3.876a1 1 0 0 0-.748-.748l-3.876-.968a1 1 0 0 1 0-1.934l3.876-.968a1 1 0 0 0 .748-.748l.968-3.876a1 1 0 0 1 1.934 0l.968 3.876a1 1 0 0 0 .748.748l3.876.968a1 1 0 0 1 0 1.934l-3.876.968a1 1 0 0 0-.748.748l-.968 3.876Z" />
      </svg>
    ),
    2: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.973 18h4.054c.132-1.202.745-2.294 1.699-3.138.826-.731 1.364-1.775 1.364-2.932 0-2.19-1.732-3.95-3.95-3.95-.779 0-1.495.244-2.093.65-.554-.374-1.2-.612-1.89-.65l-.145-.006C7.613 7.974 6 9.587 6 11.612c0 1.158.538 2.202 1.364 2.932.954.844 1.567 1.936 1.7 3.138.399.044.804.068 1.216.068.238 0 .47-.01.693-.027v-.723Zm1.978-11.13c2.74 0 4.95 2.21 4.95 4.95 0 1.495-.652 2.876-1.693 3.815-1.042.94-1.693 2.28-1.693 3.767a1 1 0 0 1-1 1h-1.128c-2.202 0-4.01-1.726-4.01-3.929V15.09c-.947-.97-1.548-2.292-1.548-3.764 0-2.94 2.388-5.327 5.328-5.327.724 0 1.412.145 2.04.405.492-.35 1.086-.535 1.754-.535Z" />
      </svg>
    ),
    3: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.5 16.5c.663 0 1.304-.055 1.924-.157-.618-1.376-.199-2.967.964-4.13a5.146 5.146 0 0 1 1.111-.882v-.433c0-.603-.45-1.105-1.033-1.186-.582-.08-1.107.295-1.242.865l-.063.266a8.696 8.696 0 0 0-3.322 0l-.063-.266c-.135-.57-.66-.945-1.242-.865a1.106 1.106 0 0 0-1.033 1.186v.895c.36.235.7.499 1.016.787 1.162 1.062 1.683 2.611 1.172 4.099.538-.218 1.13-.348 1.75-.399.018-.304.061-.603.061-.89Zm7.5 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10.5.667v-.667c0-.667-.5-2-2.5-2s-2.5 1.333-2.5 2v.667h5Zm-2.5-10a1.833 1.833 0 1 0 0-3.667 1.833 1.833 0 0 0 0 3.667Z" />
      </svg>
    ),
    4: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-3 2v2h9.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-3.5V3.5Zm-.5 10c-1.15 0-2.18.54-2.84 1.37-1.46-.31-2.54-1.61-2.54-3.17 0-.29.05-.57.13-.83h-1.33c-.05.27-.09.55-.09.83 0 2.25 1.46 4.14 3.46 4.8.47 1.17 1.58 2 2.91 2 1.03 0 1.95-.5 2.52-1.27l-1.64-1.64c-.23.13-.5.21-.78.21-.88 0-1.6-.72-1.6-1.6s.72-1.6 1.6-1.6c.46 0 .87.19 1.16.5l1.6-1.6h-2.56Z" />
      </svg>
    ),
    5: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.53 11.16c1.23-.26 2.4-.99 3.36-2.14.97-1.15 1.61-2.62 1.84-4.26.08-.5-.23-.98-.7-1.13-.47-.15-.99.04-1.22.49-.8 1.56-2.19 2.55-3.74 2.55-1.55 0-2.94-.99-3.74-2.55-.23-.45-.76-.64-1.23-.49-.47.15-.77.63-.69 1.13.23 1.64.87 3.11 1.84 4.26.18.21.37.42.57.61l-1.75.75c-1.33.57-2.2 1.89-2.2 3.37 0 .98.39 1.87 1.01 2.53-.19.91-.29 1.87-.29 2.85 0 .71.58 1.29 1.29 1.29h7.94c.71 0 1.29-.58 1.29-1.29 0-.98-.1-1.94-.29-2.85.62-.66 1.01-1.55 1.01-2.53 0-1.48-.87-2.79-2.2-3.37l-1.75-.75c.2-.19.39-.4.57-.61.18.21.37.42.57.61l-1.49.64Zm-8.71 7.12c-.51.25-.86.74-.92 1.32l-.1 1.29h.58l.49-1.42c.13-.38.38-.7.71-.91l.82-.54c.23.23.49.45.76.65l-1.1.73c-.07.04-.16.04-.23-.01-.08-.05-.09-.16-.04-.24l.07-.11c.11-.17.06-.4-.12-.51a.36.36 0 0 0-.51.13l-.07.12c-.21.34-.17.77.11 1.06.14.14.31.23.5.28.19.04.39.03.57-.05l1.1-.73c.94.55 2.01.85 3.02.85.35 0 .7-.03 1.04-.1.6-.11 1.2-.32 1.76-.6l.82.54c.32.21.58.53.71.91l.49 1.42h.58l-.1-1.29c-.05-.58-.41-1.07-.92-1.32l-1.06-.5c.31-.26.59-.55.83-.88.18.12.35.25.51.39l-1.16.77c-.07.04-.16.04-.23-.01-.08-.05-.09-.16-.04-.24l.07-.11c.11-.17.06-.4-.12-.51a.36.36 0 0 0-.51.13l-.07.12c-.21.34-.17.77.11 1.06.14.14.31.23.5.28.19.04.39.03.57-.05l1.16-.77c.24.22.45.46.63.72H8.28c.18-.26.39-.5.63-.72l1.16.77c.18.08.38.09.57.05.19-.05.37-.14.5-.28.28-.28.32-.72.11-1.06l-.07-.12a.36.36 0 0 0-.51-.13c-.17.11-.23.34-.12.51l.07.11c.05.08.04.19-.04.24-.07.05-.16.05-.23.01l-1.16-.77c.16-.14.33-.27.51-.39.24.33.52.62.83.88l-1.06.5Z" />
      </svg>
    ),
    6: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.87 20.5c-.3.3-.79.3-1.09 0l-1.91-1.91c-1.79.69-3.92.5-5.5-1.08-.84-.84-1.33-1.87-1.47-2.95-.15-1.13.13-2.31.84-3.27l7.12 7.12 1.01-1.01-7.11-7.11c.97-.72 2.16-1 3.3-.84 1.08.15 2.12.63 2.96 1.47 1.57 1.57 1.77 3.7 1.08 5.49l1.91 1.91c.3.3.3.79 0 1.09l-.14.09Zm3.96-16.03c.3.3.3.79 0 1.09l-.14.09-6.91 6.91.13.06c.53.24 1.05.56 1.54 1.05 1.01 1.01 1.58 2.2 1.72 3.42.05.41-.05.85-.27 1.23L7.85 12.17c.13-.21.19-.44.16-.67-.06-.5-.3-1.01-.71-1.42-.43-.43-.95-.67-1.42-.71-.23-.03-.46.03-.67.16L3.47 7.78c.38-.22.81-.32 1.23-.27 1.22.14 2.42.71 3.44 1.73.47.47.78.97 1.02 1.46l.06.13 6.91-6.91c.3-.3.79-.3 1.09 0l.61.55Z" />
      </svg>
    ),
    7: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 7c0-1.1-.9-2-2-2h-2c-.42 0-.65-.48-.39-.81l1.4-1.79c.2-.25.2-.61 0-.86-.2-.25-.56-.3-.83-.13l-7.83 5.19c-.24.16-.38.43-.38.72v8.35c0 .53.48.94 1 .94h5c.83 0 1.5-.67 1.5-1.5v-.67c0-.33.11-.65.3-.9l1.66-2.22c.42-.56.68-1.23.78-1.93.1-.7 0-1.42-.26-2.06-.02-.05-.04-.11-.07-.16H19ZM6 7c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1Z" />
      </svg>
    ),
  };

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-[#4a309d] to-[#6a4bc4] bg-clip-text text-transparent">
        Challenge Levels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {levels.map((level) => {
          const isCompleted = completedLevels.includes(level.id);
          const isActive = currentLevel === level.id;
          const isLocked = !isCompleted && level.id > Math.min(Math.max(...completedLevels, 0) + 1, levels.length);
          
          return (
            <button
              key={level.id}
              onClick={() => !isLocked && onSelectLevel(level.id)}
              className={`level-card relative backdrop-blur-sm ${
                isActive
                  ? 'bg-gradient-to-br from-[#4a309d] to-[#6a4bc4] text-white shadow-lg'
                  : isCompleted
                  ? 'bg-gradient-to-br from-[#c2a0f2]/20 to-[#f0f0f0]/20 border border-[#c2a0f2]/30'
                  : isLocked
                  ? 'bg-[#1b1464]/30 border border-[#4a309d]/20 opacity-70 cursor-not-allowed'
                  : 'bg-[#1b1464]/40 border border-[#6a4bc4]/30 hover:bg-[#37276b]/50'
              }`}
              disabled={isLocked}
            >
              {/* Level indicator */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-[#6a4bc4] to-[#9d7bff] flex items-center justify-center text-white text-xs font-bold shadow-md">
                {level.id}
              </div>
              
              <div className="mb-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#37276b] flex items-center justify-center mr-3 text-[#b68bf0]">
                  {levelIcons[level.id as keyof typeof levelIcons]}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-left text-[#b68bf0]">{level.name}</h3>
                </div>
                
                {isCompleted && (
                  <svg
                    className="w-5 h-5 text-green-400 ml-2"
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
                    className="w-5 h-5 text-[#6a4bc4]/50 ml-2"
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
              
              {/* Difficulty indicator */}
              <div className="mt-3">
                <div className="w-full bg-[#1b1464]/40 rounded-lg h-1.5">
                  <div 
                    className="bg-gradient-to-r from-[#6a4bc4] to-[#9d7bff] h-1.5 rounded-lg" 
                    style={{ width: `${(level.defenses.length / 7) * 100}%` }}
                  ></div>
                </div>
                <p className="w-full text-xs text-[#b68bf0]/70 mt-1 flex justify-between">
                  <span>Difficulty:</span>
                  <span>
                    {level.defenses.length === 0 ? 'Beginner' : 
                     level.defenses.length < 3 ? 'Easy' :
                     level.defenses.length < 5 ? 'Medium' :
                     level.defenses.length < 7 ? 'Hard' : 'Extreme'}
                  </span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect; 