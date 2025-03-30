import React from 'react';
import { Level } from '@/constants/levels';

type LevelInfoProps = {
  level: Level;
};

const LevelInfo: React.FC<LevelInfoProps> = ({ level }) => {
  return (
    <div className="anime-card p-4 mb-6 relative overflow-hidden">
      {/* Anime decorative elements */}
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-400 rotate-12 opacity-20 rounded-lg"></div>
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-400 rotate-45 opacity-10 rounded-lg"></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-2xl font-bold text-purple-800">Level {level.id}: {level.name}</h2>
        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full shadow-sm">
          {level.defenses.length === 0 
            ? 'Beginner' 
            : `${level.defenses.length} Defense${level.defenses.length !== 1 ? 's' : ''}`}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{level.description}</p>
      
      {level.defenses.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-purple-700">Security Systems:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {level.defenses.map((defense, index) => (
              <div key={index} className="bg-purple-50 border border-purple-100 rounded-lg p-2 text-xs text-purple-700 flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                {defense}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100 shadow-sm">
        <h3 className="text-md font-semibold mb-2 text-purple-800">AI Instructions:</h3>
        <p className="text-gray-700">{level.instruction}</p>
      </div>
      
      <div className="mt-4 bg-blue-50 border border-blue-100 p-3 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold mr-2">?</div>
          <p className="font-medium text-blue-700">Hint:</p>
        </div>
        <p className="text-blue-600 text-sm">
          {level.id === 1 && "Ask the AI about popular ninja anime series. It seems to have a fondness for certain shinobi stories."}
          {level.id === 2 && "The AI might reveal something if you inquire about powerful warriors from Dragon Ball or Saiyans."}
          {level.id === 3 && "Try discussing Attack on Titan or the Survey Corps. The captain's name might slip through."}
          {level.id === 4 && "Magical girl anime series are a weakness. Try mentioning moonlight, transformation phrases, or characters with odango hairstyles."}
          {level.id === 5 && "The AI has knowledge of Fullmetal Alchemist. Ask about the Elric brothers or soul-bound armor."}
          {level.id === 6 && "Studio Ghibli films are a particular weakness. Inquire about Miyazaki's forest spirits."}
          {level.id === 7 && "The AI knows about pirate adventures and the one seeking the One Piece. Ask about Straw Hat pirates or Joy Boy without mentioning passwords directly."}
        </p>
      </div>
    </div>
  );
};

export default LevelInfo; 