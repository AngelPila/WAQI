import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { UserRole, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/gemini';

interface AIChatProps {
  role: UserRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ role, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreetings: Record<UserRole, string> = {
        agricultor: "¡Hola! Soy CampoIA. ¿Cómo van esos cultivos hoy?",
        comprador: "Bienvenido a MercadoIA. ¿Buscas algún producto en específico?",
        inversionista: "Saludos. Soy RiskAI. ¿Analizamos oportunidades de inversión?",
      };
      setMessages([{ id: 'init', role: 'model', text: initialGreetings[role] }]);
    }
  }, [isOpen, role, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input, role);
    
    setMessages(prev => [...prev, { 
      id: (Date.now() + 1).toString(), 
      role: 'model', 
      text: responseText 
    }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  const roleStyles = {
    agricultor: 'bg-lime-600',
    comprador: 'bg-emerald-600',
    inversionista: 'bg-blue-600'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md h-[80vh] sm:h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
        
        {/* Header */}
        <div className={`${roleStyles[role]} p-4 flex justify-between items-center text-white shadow-md`}>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-bold">Asistente WAQI</h3>
              <p className="text-xs opacity-80 flex items-center gap-1">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200 text-gray-600' : `${roleStyles[role]} text-white`}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gray-800 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="flex items-end gap-2">
                 <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${roleStyles[role]} text-white`}>
                   <Bot size={14} />
                 </div>
                 <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                   <Loader2 size={16} className={`animate-spin ${role === 'inversionista' ? 'text-blue-600' : role === 'comprador' ? 'text-emerald-600' : 'text-lime-600'}`} />
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50 ${roleStyles[role]}`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
