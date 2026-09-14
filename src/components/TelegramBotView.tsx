import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Key, 
  AlertTriangle,
  Sparkles,
  Lock
} from 'lucide-react';

export const TelegramBotView: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([
    { role: 'bot', text: 'Namaste! Welcome to Aroka Telegram Assistant (@ArokaAppBot). Use /services, /bazar, /companions, or /support to explore.' }
  ]);
  const [inputCmd, setInputCmd] = useState('');
  const [isLinked, setIsLinked] = useState(false);
  const [linkingToken, setLinkingToken] = useState('AROKA-TG-98214');

  const handleCommand = async (cmd: string) => {
    setMessages(prev => [...prev, { role: 'user', text: cmd }]);
    setInputCmd('');

    try {
      const res = await fetch('/api/telegram/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Aroka Telegram Gateway: Command received.' }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0088cc] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs">
          <Send className="w-3.5 h-3.5" />
          Official Telegram Channel: @ArokaAppBot
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Aroka Telegram AI Assistant
        </h1>
        <p className="text-xs sm:text-sm text-sky-100 max-w-xl leading-relaxed">
          Receive local Bazar notifications, companion session reminders, and customer support via Telegram.
        </p>

        {/* Strict No-WhatsApp privacy banner */}
        <div className="p-3 rounded-2xl bg-black/20 border border-white/20 text-xs flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-white text-[11px]">Strict Anti-WhatsApp Privacy Rule:</span>
            <p className="text-[10px] text-sky-100 leading-normal">
              Aroka never integrates WhatsApp API or WhatsApp OTPs. We protect user privacy by supporting open, secure channels like Telegram and in-app messaging.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Linking Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
            <Key className="w-4 h-4 text-emerald-600" />
            Account Link Status
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Telegram Status:</span>
              <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                isLinked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isLinked ? 'Linked & Verified' : 'Pending Link'}
              </span>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block">One-Time Linking Code:</span>
              <div className="flex items-center justify-between font-mono font-bold text-sm text-slate-900 bg-white p-2 rounded-lg border mt-1">
                <span>{linkingToken}</span>
                <button
                  onClick={() => {
                    setIsLinked(true);
                    alert('Aroka account linked with Telegram user #9823411!');
                  }}
                  className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded-md font-sans font-bold"
                >
                  {isLinked ? 'Linked' : 'Verify'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-500">
            <span className="font-bold text-slate-700 block">Supported Commands:</span>
            <ul className="space-y-1 font-mono text-[11px]">
              <li><code className="text-sky-700 font-bold">/start</code> — Welcome & overview</li>
              <li><code className="text-sky-700 font-bold">/bazar</code> — Local Hinjilicut deals</li>
              <li><code className="text-sky-700 font-bold">/companions</code> — Peer mentor list</li>
              <li><code className="text-sky-700 font-bold">/support</code> — Open care ticket</li>
            </ul>
          </div>
        </div>

        {/* Telegram Interactive Terminal */}
        <div className="md:col-span-2 bg-slate-900 text-white rounded-3xl shadow-lg border border-slate-800 flex flex-col h-[480px]">
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">Aroka Bot (@ArokaAppBot)</span>
                <span className="text-[10px] text-emerald-400">bot • active</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">TG-API v7.4</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-sm ${
                    m.role === 'user'
                      ? 'bg-[#0088cc] text-white rounded-br-xs'
                      : 'bg-slate-800 text-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick command buttons */}
          <div className="p-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {['/start', '/help', '/bazar', '/companions', '/support'].map(cmd => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono font-semibold text-sky-300 whitespace-nowrap"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (inputCmd.trim()) handleCommand(inputCmd);
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type /command or message @ArokaAppBot..."
              value={inputCmd}
              onChange={e => setInputCmd(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-900 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#0088cc] hover:bg-sky-600 text-white"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
