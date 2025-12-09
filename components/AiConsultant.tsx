import React, { useState, useRef, useEffect } from 'react';
import { streamObjectionResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Send, User, X } from 'lucide-react';

export const AiConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm the Full Cycle AI Specialist. Ask me anything about our dual-unit systems, efficiency ratings, or the installation process." }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    let fullResponse = "";
    const modelMsg: ChatMessage = { role: 'model', text: '' };
    setMessages(prev => [...prev, modelMsg]);

    await streamObjectionResponse(userMsg.text, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
        return newArr;
      });
    });

    setIsStreaming(false);
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-brand-primary text-white p-4 rounded-full shadow-2xl z-50 hover:bg-blue-600 transition-all hover:scale-110 flex items-center gap-2"
        >
          <Bot size={24} />
          <span className="font-bold">Ask AI Expert</span>
        </button>
      )}

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-500 transform origin-bottom-right border border-gray-200 ${isOpen ? 'scale-100 opacity-100 h-[600px]' : 'scale-0 opacity-0 h-0 overflow-hidden'}`}>
        
        {/* Header */}
        <div className="bg-brand-dark p-4 rounded-t-2xl flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse" />
                <h3 className="font-bold">Full Cycle AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-brand-accent text-white'}`}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 rounded-b-2xl">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about savings, noise..."
                    className="bg-transparent flex-1 outline-none text-sm text-gray-800"
                />
                <button type="submit" disabled={isStreaming} className="text-brand-primary hover:text-blue-700 disabled:opacity-50">
                    <Send size={18} />
                </button>
            </div>
        </form>
      </div>
    </>
  );
};