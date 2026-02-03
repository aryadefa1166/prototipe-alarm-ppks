import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function EduBot() {
  const { chatHistory, sendMessage } = useApp();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [chatHistory]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[75vh] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header Bot */}
      <div className="p-4 bg-usu text-white flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-full"><Bot size={24} /></div>
        <div>
          <h3 className="font-bold">Edu-Bot Assistant</h3>
          <p className="text-[10px] opacity-80">AI Support Psikologi & Hukum</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-usu text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya sesuatu..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-usu"
        />
        <button type="submit" className="p-2 bg-usu text-white rounded-full hover:bg-usu-dark">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}