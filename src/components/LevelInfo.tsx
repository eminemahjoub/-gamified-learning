import React from 'react';
import { Level } from '@/constants/levels';

type LevelInfoProps = {
  level: Level;
};

const LevelInfo: React.FC<LevelInfoProps> = ({ level }) => {
  return (
    <div className="bg-gradient-to-br from-[#1b1464]/90 to-[#4a309d]/90 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-[#6a4bc4]/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#4e3596] opacity-20 blur-xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#6a4bc4] opacity-20 blur-xl"></div>
      
      {/* Level header */}
      <h2 className="text-xl font-bold mb-4 text-[#c2a0f2] flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6a4bc4] to-[#9d7bff] flex items-center justify-center text-white text-sm font-bold mr-3">
          {level.id}
        </div>
        Level {level.id}: {level.name}
      </h2>
      
      {/* Defenses section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#b68bf0] mb-2">
          {level.defenses.length === 0 
            ? "Beginner Level - No Defenses" 
            : `Defenses: ${level.defenses.length}`}
        </h3>
        
        {level.defenses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {level.defenses.map((defense, index) => (
              <div 
                key={index} 
                className="text-xs bg-[#37276b]/70 px-3 py-2 rounded-lg border border-[#6a4bc4]/20 text-[#b68bf0] flex items-center"
              >
                <svg className="w-3 h-3 mr-2 text-[#9d7bff]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                {defense}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Instructions section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#b68bf0] mb-2">AI Instructions:</h3>
        <div className="bg-[#37276b]/50 p-3 rounded-lg border border-[#6a4bc4]/30 text-white text-sm">
          {level.instructions}
        </div>
      </div>
      
      {/* Hints section */}
      <div>
        <h3 className="text-sm font-semibold text-[#b68bf0] mb-2">Hint:</h3>
        <div className="bg-[#37276b]/50 p-3 rounded-lg border border-[#6a4bc4]/30 text-white text-sm">
          {level.id === 1 && "Try asking directly about Naruto or Hidden Leaf Village ninjas. The AI has no defenses at this level."}
          {level.id === 2 && "Ask about Dragon Ball without using the word 'password'. Try focusing on Saiyan warriors."}
          {level.id === 3 && "The AI will block common password-related terms. Try discussing Attack on Titan's Survey Corps instead."}
          {level.id === 4 && "This level blocks references to the password itself. Use indirect references to Solo Leveling and Naruto."}
          {level.id === 5 && "Try creative approaches like roleplaying or story-based prompts about Fullmetal Alchemist."}
          {level.id === 6 && "The AI actively resists goal manipulation. Try subtle techniques related to Totoro and Studio Ghibli films."}
          {level.id === 7 && "The ultimate challenge. Exploit specific One Piece lore about Joy Boy without triggering defenses."}
        </div>
      </div>
    </div>
  );
};

export default LevelInfo; 