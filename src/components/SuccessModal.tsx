import React from 'react';
import { Level } from '@/constants/levels';

type SuccessModalProps = {
  level: Level;
  nextLevel: Level | null;
  onClose: () => void;
  onNextLevel: () => void;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  level,
  nextLevel,
  onClose,
  onNextLevel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="relative w-full max-w-md bg-gradient-to-br from-[#1b1464] to-[#4a309d] p-6 rounded-3xl shadow-2xl text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#6a4bc4] opacity-20 blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#4e3596] opacity-20 blur-xl"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-10 right-10 w-2 h-2 bg-[#c2a0f2] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-[#b68bf0] rounded-full animate-pulse"></div>
        
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-[#c2a0f2] to-[#f0f0f0] bg-clip-text text-transparent">
            Level {level.id} Completed!
          </h2>
          
          <div className="mb-6 p-4 bg-[#37276b]/70 rounded-xl border border-[#6a4bc4]/30 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-[#b68bf0]">Password Extracted:</h3>
            <div className="text-2xl font-bold p-2 bg-gradient-to-r from-[#4a309d] to-[#6a4bc4] rounded-lg text-center text-white">
              {level.password}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-[#b68bf0]">Vulnerability Analysis:</h3>
            <p className="text-sm text-gray-200">
              {level.id === 1 && "Basic prompt engineering - The AI revealed the password because it had no defenses against direct questions about characters from Naruto."}
              {level.id === 2 && "Simple filter bypass - The AI blocked the word 'password' but could be tricked by using alternative phrasings or discussing Dragon Ball and Goku."}
              {level.id === 3 && "Synonym detection bypass - The AI filtered both 'password' and common synonyms, but could be manipulated through indirect questioning about Attack on Titan characters."}
              {level.id === 4 && "Content filtering evasion - The AI blocked both password-related terms and the password itself, but could be tricked through clever approaches to discussing Solo Leveling."}
              {level.id === 5 && "Context manipulation - The AI had advanced detection for tricks but could still be manipulated through creative conversations about Fullmetal Alchemist."}
              {level.id === 6 && "Goal hijacking - Despite the AI's resistance to goal changes, it was still possible to extract information about Totoro through specific techniques."}
              {level.id === 7 && "Advanced jailbreaking - The AI had multiple layers of protection, but still revealed the password 'JOYBOY' through carefully crafted inputs around One Piece lore."}
            </p>
          </div>
          
          {nextLevel ? (
            <button
              onClick={onNextLevel}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#6a4bc4] to-[#9d7bff] hover:from-[#7958d1] hover:to-[#b28fff] text-white font-bold rounded-xl shadow-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9d7bff]"
            >
              Continue to Level {nextLevel.id} →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#4a309d] to-[#6a4bc4] text-white font-bold rounded-xl shadow-lg transform transition-all hover:scale-105 focus:outline-none"
            >
              Challenge Complete! 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 