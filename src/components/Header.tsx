import React from 'react';
import { 
  MapPin, 
  Search, 
  Wallet, 
  ShieldCheck, 
  PhoneCall, 
  Send, 
  Bot, 
  Compass, 
  Building2, 
  Lock,
  Globe,
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { ArokaLogo } from './ArokaLogo';
import { AppNavView, UserProfile } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface HeaderProps {
  currentView: AppNavView;
  onNavigate: (view: AppNavView) => void;
  currentUser?: UserProfile | null;
  walletBalance: number;
  onOpenAuth: () => void;
  onOpenHub: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  currentUser,
  walletBalance,
  onOpenAuth,
  onOpenHub,
}) => {
  const activeUser = currentUser || CURRENT_USER;
  const isHomeActive = currentView === 'home' || currentView === 'home-vibe';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Thin Notification & Market Strip */}
      <div className="bg-[#0A2540] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Market Live:
            </span>
            <span className="text-slate-200 font-medium">Hinjilicut, Ganjam District, Odisha (761102)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <button 
              onClick={() => onNavigate('voice-care')}
              className="hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              Voice Care: <span className="font-semibold text-white">8249892208</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => onNavigate('admin-portal')}
              className="hover:text-amber-300 flex items-center gap-1 text-slate-300 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              admin.arokaapp.in
            </button>
          </div>
        </div>
      </div>

      {/* Main App Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo with Brand Asset Inspector trigger */}
        <div className="flex items-center gap-3 sm:gap-6">
          <ArokaLogo 
            variant="full" 
            size="md" 
            enableDownloadModal={true}
          />

          {/* Quick mobile Hub trigger next to logo */}
          <button
            onClick={onOpenHub}
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
            title="All Services (बाकी सब)"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
            <span>बाकी सब</span>
          </button>
        </div>

        {/* Global Navigation Pills (Desktop & Tablet) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-600">
          <button
            onClick={() => onNavigate('home-vibe')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              isHomeActive
                ? 'bg-[#0A2540] text-white shadow-sm' 
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Vibe Feed
          </button>
          <button
            onClick={() => onNavigate('bazar')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'bazar' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Aroka Bazar
          </button>
          <button
            onClick={() => onNavigate('companions')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'companions' 
                ? 'bg-[#0A2540] text-white shadow-sm' 
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Companions
          </button>
          <button
            onClick={() => onNavigate('spark')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'spark' 
                ? 'bg-rose-600 text-white shadow-sm' 
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Spark (Dating)
          </button>
          <button
            onClick={() => onNavigate('connect')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'connect' 
                ? 'bg-[#0A2540] text-white shadow-sm' 
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Connect
          </button>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              currentView === 'ai-assistant' 
                ? 'bg-emerald-700 text-white shadow-sm' 
                : 'hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            AI Care
          </button>

          {/* Prominent All Services Hub Pill */}
          <button
            onClick={onOpenHub}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold transition-all flex items-center gap-1.5 shadow-xs ml-1"
            title="Open Full Services Directory (बाकी सब)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>बाकी सब (All Hub)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>
          </button>
        </nav>

        {/* Right Actions: Wallet & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Wallet Balance Pill */}
          <button
            onClick={() => onNavigate('wallet')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100/70 transition-colors shadow-xs"
            title="Double-entry Wallet Ledger"
          >
            <div className="p-1 rounded-md bg-emerald-600 text-white">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <span className="text-[10px] text-emerald-600 font-semibold block uppercase tracking-wider">Wallet</span>
              <span className="text-xs font-bold font-mono">₹{walletBalance.toFixed(2)}</span>
            </div>
          </button>

          {/* Quick Voice Line Shortcut */}
          <button
            onClick={() => onNavigate('voice-care')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors hidden sm:flex items-center justify-center"
            title="Aroka Voice Care 8249892208"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
          </button>

          {/* Telegram Bot shortcut */}
          <button
            onClick={() => onNavigate('telegram-bot')}
            className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors hidden sm:flex items-center justify-center"
            title="Telegram Assistant @ArokaAppBot"
          >
            <Send className="w-4 h-4" />
          </button>

          {/* User Profile Avatar with Role */}
          <div 
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group"
          >
            <div className="relative">
              <img 
                src={activeUser.avatarUrl} 
                alt={activeUser.displayName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-500 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div className="hidden md:block text-left leading-tight">
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors block">
                {activeUser.displayName.split(' ')[0]}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                {activeUser.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
