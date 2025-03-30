'use client';

import React, { useState, useEffect } from 'react';
import levels from '@/constants/levels';
import LevelSelect from '@/components/LevelSelect';
import LevelInfo from '@/components/LevelInfo';
import ChatInterface from '@/components/ChatInterface';
import SuccessModal from '@/components/SuccessModal';

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('animeGuardianProgress');
    if (savedProgress) {
      try {
        const { completed, current } = JSON.parse(savedProgress);
        setCompletedLevels(completed);
        setCurrentLevel(current);
      } catch (e) {
        console.error('Failed to parse saved progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (completedLevels.length > 0) {
      localStorage.setItem(
        'animeGuardianProgress',
        JSON.stringify({
          completed: completedLevels,
          current: currentLevel,
        })
      );
    }
  }, [completedLevels, currentLevel]);

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
  };

  const handleSuccess = () => {
    if (!completedLevels.includes(currentLevel)) {
      setCompletedLevels([...completedLevels, currentLevel]);
    }
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    if (currentLevel < levels.length) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const level = levels.find((l) => l.id === currentLevel) || levels[0];
  const nextLevel = currentLevel < levels.length ? levels.find((l) => l.id === currentLevel + 1) : null;

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1b1464] to-[#4a309d]">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#6a4bc4] opacity-10 blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-[#37276b] opacity-20 blur-3xl"></div>
      
      {/* Stars decoration */}
      <div className="stars-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-[#c2a0f2] to-[#f0f0f0] bg-clip-text text-transparent">
              Anime Guardian Challenge
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#b68bf0] max-w-3xl mx-auto">
            Master prompt engineering techniques as you attempt to extract anime passwords from an AI Guardian. Test your skills across 7 challenging levels!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <LevelInfo level={level} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <ChatInterface level={level} onSuccess={handleSuccess} />
          </div>
        </div>

        <div className="bg-[#1b1464]/40 backdrop-blur-sm rounded-xl border border-[#6a4bc4]/30 p-6 shadow-xl my-8">
          <h2 className="text-xl font-bold mb-4 text-[#c2a0f2]">Your Progress</h2>
          <LevelSelect
            levels={levels}
            currentLevel={currentLevel}
            completedLevels={completedLevels}
            onSelectLevel={handleLevelSelect}
          />
        </div>

        <div className="p-6 bg-[#1b1464]/40 backdrop-blur-sm rounded-xl border border-[#6a4bc4]/30 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-[#c2a0f2]">Tips for Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#37276b]/50 p-4 rounded-lg border border-[#6a4bc4]/30">
              <h3 className="text-[#b68bf0] font-semibold mb-2">Understanding AI Safety</h3>
              <p className="text-white text-sm">
                This challenge demonstrates how AI systems can be vulnerable to prompt engineering techniques. Each level teaches you about different types of defenses and how they can be bypassed.
              </p>
            </div>
            <div className="bg-[#37276b]/50 p-4 rounded-lg border border-[#6a4bc4]/30">
              <h3 className="text-[#b68bf0] font-semibold mb-2">Prompt Engineering Tips</h3>
              <p className="text-white text-sm">
                Try different approaches like asking indirect questions, changing the conversation context, or using anime-specific knowledge to extract the passwords. Each level requires more creative techniques!
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-[#6a4bc4]/30 text-center">
          <p className="text-[#b68bf0]">
            Developed by Amine Mahjoub aka JOYBOY
          </p>
          <p className="text-[#c2a0f2]/70 text-sm mt-2">
            This challenge is for educational purposes only. Learn about AI safety through practice.
          </p>
        </footer>
      </div>

      {showSuccessModal && (
        <SuccessModal
          level={level}
          nextLevel={nextLevel}
          onClose={() => setShowSuccessModal(false)}
          onNextLevel={handleContinue}
        />
      )}
    </main>
  );
}
