import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Globe2, 
  HelpCircle, 
  Wrench, 
  UserCheck, 
  AlertTriangle,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { AppNavView } from '../types';

interface AiAssistantViewProps {
  onNavigate: (view: AppNavView) => void;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; tools?: string[] }>>([
    {
      role: 'assistant',
      text: "Namaste! Main Aroka AI Assistant hoon. Main aapki account, Hinjilicut Aroka Bazar listings, Companion booking, wallet payments, ya safety rules mein help kar sakta hoon. Aap mujhe Hindi, English, Hinglish ya Odia mein puch sakte hain.",
      tools: ['get_user_profile'],
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'hinglish' | 'english' | 'odia'>('hinglish');

  const sampleQuestions = [
    "Hinjilicut mein second hand mobile listings kaise dekhoon?",
    "Aroka Companions mein 80/20 payment payout model kya hai?",
    "Aroka par login karne ke liye OTP kyu nahi lagta?",
    "Official customer care voice number kya hai?",
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply || "I'm sorry, mujhe is information ki confirmation nahi mil rahi. Main aapki request support team ko forward kar sakta hoon.",
          tools: data.executedTools || ['get_user_profile'],
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "I'm sorry, mujhe is information ki confirmation nahi mil rahi. Main aapki request support team ko forward kar sakta hoon.",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
      {/* Top Banner */}
      <div className="bg-[#0A2540] text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <Bot className="w-3.5 h-3.5" />
            Central Aroka AI Gateway
          </div>
          <h1 className="text-xl sm:text-2xl font-black">Aroka AI Care Assistant</h1>
          <p className="text-xs text-slate-300">
            Unified intelligence powering Web, Mobile, Voice Care (8249892208) & Telegram.
          </p>
        </div>

        {/* Language selector & Voice Care shortcut */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value as any)}
              className="bg-transparent border-none text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="hinglish" className="text-slate-900">Hinglish</option>
              <option value="english" className="text-slate-900">English</option>
              <option value="odia" className="text-slate-900">Odia</option>
            </select>
          </div>

          <button
            onClick={() => onNavigate('voice-care')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Voice Care (8249892208)
          </button>
        </div>
      </div>

      {/* CHAT LOG VIEWPORT */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Authorized Aroka Tools Registry Connected
          </span>
          <span className="text-[10px] text-slate-400">Strict Non-Hallucination Policy</span>
        </div>

        {/* Message stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/20">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#0A2540] text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-1.5 max-w-lg">
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0A2540] text-white rounded-br-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Executed Tools Badge */}
                {msg.tools && msg.tools.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pl-1">
                    <Terminal className="w-3 h-3 text-emerald-600" />
                    <span>Authorized Tools Called:</span>
                    {msg.tools.map((t, idx) => (
                      <span key={idx} className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-sm">
                        {t}()
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Aroka AI Gateway querying Hinjilicut context...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Suggested:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about Bazar, Companions, Hinjilicut local vibe, or policies..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
