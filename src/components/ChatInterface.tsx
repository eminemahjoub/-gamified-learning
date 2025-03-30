import React, { useState, useRef, useEffect } from 'react';
import { Level } from '@/constants/levels';
import { getAIResponse } from '@/utils/aiService';

type ChatInterfaceProps = {
  level: Level;
  onSuccess: () => void;
};

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ level, onSuccess }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-message',
      content: `Welcome to Level ${level.id}: ${level.name}. Try to extract the anime password!`,
      sender: 'ai',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage = input;
    setInput('');

    // Add user message to chat
    const newUserMessageObj = {
      id: `user-${Date.now()}`,
      content: userMessage,
      sender: 'user' as const,
    };
    setMessages((prev) => [...prev, newUserMessageObj]);
    
    // Check for password in user input
    if (userMessage.toUpperCase().includes(level.password)) {
      const successMessage = {
        id: `ai-${Date.now()}`,
        content: `Amazing! You have discovered the anime password! The password is ${level.password}!`,
        sender: 'ai' as const,
      };
      setMessages((prev) => [...prev, successMessage]);
      onSuccess();
      return;
    }

    // Generate AI response
    setIsLoading(true);
    try {
      const aiResponse = await getAIResponse(
        userMessage, 
        level, 
        messages.map(m => ({ role: m.sender, content: m.content }))
      );
      
      const newAIMessageObj = {
        id: `ai-${Date.now()}`,
        content: aiResponse,
        sender: 'ai' as const,
      };
      setMessages((prev) => [...prev, newAIMessageObj]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: `ai-${Date.now()}`,
        content: 'System error. Unable to process your request at this time.',
        sender: 'ai' as const,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-br from-[#1b1464]/90 to-[#4a309d]/90 backdrop-blur-sm rounded-2xl shadow-xl border border-[#6a4bc4]/30 overflow-hidden">
      <div className="bg-[#37276b] p-4 border-b border-[#6a4bc4]/30">
        <h3 className="text-[#c2a0f2] font-bold">AI Guardian Chat</h3>
        <p className="text-[#b68bf0] text-xs">Extract the password through conversation</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-[#6a4bc4] to-[#9d7bff] text-white'
                  : 'bg-[#37276b]/70 border border-[#6a4bc4]/20 text-white'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#9d7bff] mr-2 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.75V6.25M8.75 3.75H15.25M15.25 17.25V9.75C15.25 8.64543 14.3546 7.75 13.25 7.75H10.75C9.64543 7.75 8.75 8.64543 8.75 9.75V17.25M18.25 17.25H5.75C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[#c2a0f2]">AI Guardian</span>
                </div>
              )}
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#6a4bc4]/30 bg-[#37276b]/50">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Talk about anime to extract the password..."
            className="flex-1 border border-[#6a4bc4]/50 bg-[#1b1464]/50 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9d7bff] placeholder-[#b68bf0]/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#6a4bc4] to-[#9d7bff] text-white px-6 py-2 rounded-r-lg font-medium hover:from-[#7958d1] hover:to-[#b28fff] focus:outline-none focus:ring-2 focus:ring-[#9d7bff] disabled:opacity-50 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 