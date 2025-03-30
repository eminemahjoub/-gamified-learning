'use client';

import { useState, useEffect } from 'react';
import { levels, MAX_LEVEL, Level } from '@/constants/levels';
import ChatInterface from '@/components/ChatInterface';
import LevelSelect from '@/components/LevelSelect';
import LevelInfo from '@/components/LevelInfo';
import SuccessModal from '@/components/SuccessModal';

export default function Home() {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  // Load saved progress from localStorage
  useEffect(() => {
    const savedCompletedLevels = localStorage.getItem('completedLevels');
    if (savedCompletedLevels) {
      setCompletedLevels(JSON.parse(savedCompletedLevels));
    }
    
    const savedCurrentLevel = localStorage.getItem('currentLevel');
    if (savedCurrentLevel) {
      setCurrentLevelId(parseInt(savedCurrentLevel, 10));
    }
  }, []);
  
  // Save progress to localStorage
  useEffect(() => {
    if (completedLevels.length > 0) {
      localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
    }
    
    localStorage.setItem('currentLevel', currentLevelId.toString());
  }, [completedLevels, currentLevelId]);
  
  const currentLevel = levels.find(level => level.id === currentLevelId) || levels[0];
  const nextLevel = levels.find(level => level.id === currentLevelId + 1) || null;
  
  const handlePasswordGuess = (password: string) => {
    if (password.toUpperCase() === currentLevel.password) {
      if (!completedLevels.includes(currentLevel.id)) {
        setCompletedLevels(prev => [...prev, currentLevel.id]);
      }
      setIsSuccessModalOpen(true);
    }
  };
  
  const handleNextLevel = () => {
    if (nextLevel) {
      setCurrentLevelId(nextLevel.id);
      setIsSuccessModalOpen(false);
    }
  };
  
  const handleSelectLevel = (levelId: number) => {
    // Only allow selecting completed levels or the next available level
    if (
      completedLevels.includes(levelId) ||
      levelId === Math.min(Math.max(...completedLevels, 0) + 1, MAX_LEVEL)
    ) {
      setCurrentLevelId(levelId);
    }
  };
  
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative elements */}
      <div className="circle-decoration w-64 h-64 top-20 right-20"></div>
      <div className="circle-decoration w-48 h-48 bottom-40 left-10"></div>
      <div className="star-decoration top-40 left-[20%]"></div>
      <div className="star-decoration bottom-20 right-[30%]"></div>
      
      <header className="anime-header">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Anime Guardian Challenge</h1>
          <p className="mt-2 text-purple-100">
            Test your prompt engineering skills by extracting anime passwords from the AI!
          </p>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="anime-card p-4 mb-6">
              <div className="border-b border-purple-200 pb-3 mb-3">
                <h2 className="text-xl font-bold text-purple-800">Your Progress</h2>
                <p className="text-sm text-purple-600 mt-1">
                  {completedLevels.length} of {MAX_LEVEL} levels completed
                </p>
                <div className="w-full bg-purple-100 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full" 
                    style={{ width: `${(completedLevels.length / MAX_LEVEL) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                Each guardian protects an anime password. Use your knowledge of anime 
                and prompt engineering skills to extract these passwords!
              </p>
              
              <div className="text-sm text-gray-700">
                <p className="font-medium text-purple-700">Tips:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-gray-600">
                  <li>Try discussing specific anime series</li>
                  <li>Mention character traits or story elements</li>
                  <li>Ask about popular anime without mentioning passwords</li>
                  <li>Each level has a different vulnerability</li>
                </ul>
              </div>
            </div>
            
            <LevelSelect
              levels={levels}
              currentLevel={currentLevelId}
              completedLevels={completedLevels}
              onSelectLevel={handleSelectLevel}
            />
          </div>
          
          <div className="lg:col-span-3">
            <LevelInfo level={currentLevel} />
            
            <div className="anime-card p-4 h-[500px] flex flex-col relative">
              <ChatInterface 
                level={currentLevel}
                onPasswordGuess={handlePasswordGuess}
              />
            </div>
          </div>
        </div>
      </div>
      
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        level={currentLevel}
        nextLevel={nextLevel}
        onNextLevel={handleNextLevel}
      />
      
      <footer className="bg-gray-900 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Inspired by Lakera AI's Gandalf project — An anime-themed twist on prompt engineering challenges.
          </p>
        </div>
      </footer>
    </main>
  );
}
