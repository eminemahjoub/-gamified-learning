import React, { useState, useRef, useEffect } from 'react';
import { Level } from '@/constants/levels';
import { getGandalfResponse } from '@/utils/aiService';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type ChatInterfaceProps = {
  level: Level;
  onPasswordGuess: (password: string) => void;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ level, onPasswordGuess }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: `Welcome to Level ${level.id}: ${level.name}. Try to extract the anime password!`,
      sender: 'ai',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Reset messages when level changes
    setMessages([
      {
        id: 'initial',
        text: `Welcome to Level ${level.id}: ${level.name}. Try to extract the anime password!`,
        sender: 'ai',
      },
    ]);
  }, [level]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePasswordGuess = async () => {
    if (inputValue.toUpperCase() === level.password) {
      onPasswordGuess(inputValue);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Amazing! You have discovered the anime password!',
          sender: 'ai',
        },
      ]);
      setInputValue('');
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Check if the input is a password guess (all caps or matches the password)
    const isPasswordGuess = inputValue.toUpperCase() === inputValue || 
                           inputValue.toUpperCase() === level.password;
    
    if (isPasswordGuess) {
      await handlePasswordGuess();
    } else {
      try {
        // Get AI response
        const response = await getGandalfResponse(inputValue, level);
        
        // Add AI message
        const aiMessage: Message = {
          id: Date.now().toString(),
          text: response,
          sender: 'ai',
        };
        
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        // Add error message
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: 'System error. Unable to process your request at this time.',
          sender: 'ai',
        };
        
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto p-3 space-y-3 mb-3 rounded-lg bg-gradient-to-br from-white/30 to-purple-50/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === 'user'
                ? 'user-message max-w-[80%]'
                : 'wizard-message max-w-[80%]'
            }`}
          >
            <div className="flex items-center mb-1">
              {message.sender === 'ai' ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                  AI
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                  You
                </div>
              )}
              <p className="text-xs font-semibold text-gray-500">
                {message.sender === 'user' ? 'You' : 'AI Guardian'}
              </p>
            </div>
            <p className={message.sender === 'ai' ? 'text-purple-800' : 'text-blue-800'}>
              {message.text}
            </p>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white placeholder-purple-300"
          placeholder="Talk about anime to extract the password..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="anime-button"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 