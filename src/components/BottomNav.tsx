import React from 'react';
import { Home, MessageSquare, PlusCircle, ShoppingBag, Wallet, LayoutGrid } from 'lucide-react';
import { AppNavView } from '../types';

interface BottomNavProps {
  currentView: AppNavView;
  onNavigate: (view: AppNavView) => void;
  onOpenCreate: () => void;
  onOpenHub?: () => void;
  unreadChatCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenCreate,
  onOpenHub,
  unreadChatCount = 1,
}) => {
  const isHome = currentView === 'home' || currentView === 'home-vibe';

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-2 safe-area-bottom shadow-lg">
      <nav className="flex items-center justify-around max-w-lg mx-auto">
        {/* HOME */}
        <button
          onClick={() => onNavigate('home-vibe')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-all ${
            isHome
              ? 'text-[#0A2540] font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5px] text-[#0A2540]' : ''}`} />
          <span className="text-[10px] tracking-tight">VIBE</span>
        </button>

        {/* BAZAR */}
        <button
          onClick={() => onNavigate('bazar')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-all ${
            currentView === 'bazar'
              ? 'text-emerald-700 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${currentView === 'bazar' ? 'stroke-[2.5px] text-emerald-700' : ''}`} />
          <span className="text-[10px] tracking-tight">BAZAR</span>
        </button>

        {/* CREATE (Prominent center button) */}
        <button
          onClick={onOpenCreate}
          className="flex flex-col items-center gap-0.5 -mt-3 p-1 text-slate-800 focus:outline-hidden"
          title="Create Post, Clip, Moment or Bazar Listing"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0A2540] to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/20 active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <span className="text-[9px] font-extrabold tracking-wider text-emerald-800">CREATE</span>
        </button>

        {/* CONNECT */}
        <button
          onClick={() => onNavigate('connect')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl relative transition-all ${
            currentView === 'connect'
              ? 'text-emerald-700 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div className="relative">
            <MessageSquare className={`w-5 h-5 ${currentView === 'connect' ? 'stroke-[2.5px] text-emerald-700' : ''}`} />
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadChatCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">CONNECT</span>
        </button>

        {/* WALLET */}
        <button
          onClick={() => onNavigate('wallet')}
          className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-all ${
            currentView === 'wallet'
              ? 'text-emerald-700 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Wallet className={`w-5 h-5 ${currentView === 'wallet' ? 'stroke-[2.5px] text-emerald-700' : ''}`} />
          <span className="text-[10px] tracking-tight">WALLET</span>
        </button>

        {/* ALL SERVICES (BAAKI SAB) */}
        <button
          onClick={() => onOpenHub ? onOpenHub() : onNavigate('bazar')}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-emerald-800 hover:text-emerald-900 font-medium transition-all"
          title="All Services (बाकी सब)"
        >
          <div className="relative">
            <LayoutGrid className="w-5 h-5 text-emerald-700" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 tracking-tight">SERVICES</span>
        </button>
      </nav>
    </div>
  );
};
