import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { chatWithTutor } from '../services/geminiService';
import { ChatMessage } from '../types';

interface SmartTutorProps {
  initialMessage?: string;
  isFloating?: boolean;
}

const SmartTutor: React.FC<SmartTutorProps> = ({ initialMessage, isFloating = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً يا لين! 🌟 لا تترددي في طرح أي سؤال. أنا هنا لمساعدتكِ في أي وقت! سواء كان سؤالاً صعباً أو استفساراً بسيطاً، نحن فريق واحد نحو الإبداع! 🤖', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await chatWithTutor(messages, input);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full ${isFloating ? '' : 'p-4 md:p-6 animate-fade-in'}`}>
      {!isFloating && (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Bot className="text-secondary-600" size={32} />
                المعلم الذكي
                </h2>
                <p className="text-gray-500">مساعدك الشخصي للتعلم والاستفسار في أي وقت.</p>
            </div>
            <button 
                onClick={() => setMessages([messages[0]])}
                className="p-2 text-gray-400 hover:text-secondary-600 transition-colors"
                title="مسح المحادثة"
            >
                <RefreshCw size={20} />
            </button>
        </div>
      )}

      <div className={`flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${isFloating ? 'h-[500px]' : 'min-h-[500px]'}`}>
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="flex items-end gap-2">
                 <div className="w-8 h-8 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center">
                   <Bot size={16} />
                 </div>
                 <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اسألي عن أي شيء... أنا هنا لمساعدتك! 🌟"
              className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-secondary-400 focus:bg-white transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="absolute left-2 p-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? <Sparkles className="animate-spin" size={18} /> : <Send size={18} className="rtl:rotate-180" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartTutor;