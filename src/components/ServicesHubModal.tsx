import React from 'react';
import { 
  X, 
  ShoppingBag, 
  HeartHandshake, 
  Flame, 
  MessageSquare, 
  Wallet, 
  Bot, 
  PhoneCall, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Compass, 
  ArrowRight,
  Download
} from 'lucide-react';
import { AppNavView } from '../types';

interface ServicesHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppNavView) => void;
  onOpenBrandModal?: () => void;
}

export const ServicesHubModal: React.FC<ServicesHubModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBrandModal,
}) => {
  if (!isOpen) return null;

  const categories = [
    {
      title: 'Local Commerce & Marketplace',
      titleHi: 'स्थानीय बाज़ार और व्यापार',
      items: [
        {
          id: 'bazar' as AppNavView,
          name: 'Aroka Bazar',
          tag: 'PostGIS 2km-15km',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          icon: ShoppingBag,
          desc: 'Buy & sell electronics, mobiles, vehicles, and Sambalpuri handlooms. Safe Deal Rooms without revealing phone numbers.',
          descHi: 'स्थानीय ख़रीद-बिक्री, मोबाइल, गाड़ियाँ और हथकरघा सुरक्षित डील रूम के साथ।',
        },
        {
          id: 'connect' as AppNavView,
          name: 'Aroka Connect & Deal Rooms',
          tag: 'Encrypted Chat & Calls',
          badgeColor: 'bg-indigo-100 text-indigo-800',
          icon: MessageSquare,
          desc: '1-to-1 messaging, active listing negotiation Deal Rooms, ephemeral timers, and WebRTC voice/video calls.',
          descHi: 'सुरक्षित वन-ऑन-वन चैट, निजी डील रूम और वॉयस/वीडियो कॉल्स।',
        },
      ],
    },
    {
      title: 'Companionship & Discovery',
      titleHi: 'साथी सेवाएँ और डेटिंग',
      items: [
        {
          id: 'companions' as AppNavView,
          name: 'Aroka Companions',
          tag: '80/20 Payout Model',
          badgeColor: 'bg-teal-100 text-teal-800',
          icon: HeartHandshake,
          desc: 'Verified peer Study Buddies, Skill Partners, empathetic listeners, and Elder Companions (Strictly non-medical).',
          descHi: 'पढ़ाई के साथी, स्किल मेंटर और बुजुर्गों के साथी (केवाईसी सत्यापित)।',
        },
        {
          id: 'spark' as AppNavView,
          name: 'Aroka Spark (Dating)',
          tag: 'Strict Privacy Isolation',
          badgeColor: 'bg-rose-100 text-rose-800',
          icon: Flame,
          desc: 'Private swipe card deck & mutual-match discovery completely separated from your public social profile.',
          descHi: 'निजी डेटिंग प्रोफ़ाइल, स्वाइप कार्ड्स और केवल मैच होने पर सुरक्षित चैट।',
        },
      ],
    },
    {
      title: 'Finance & Payments',
      titleHi: 'वॉलेट और वित्तीय लेज़र',
      items: [
        {
          id: 'wallet' as AppNavView,
          name: 'Aroka Wallet & Ledger',
          tag: 'Double-Entry Audit',
          badgeColor: 'bg-blue-100 text-blue-800',
          icon: Wallet,
          desc: 'Projected INR balance, RBI compliant double-entry ledger, instant UPI topup, and bank payout testing.',
          descHi: 'डबल-एंट्री लेज़र, सुरक्षित यूपीआई पेमेंट और पारदर्शी आय रिपोर्ट।',
        },
      ],
    },
    {
      title: 'AI & Customer Support',
      titleHi: 'एआई असिस्टेंट और ग्राहक सेवा',
      items: [
        {
          id: 'ai-assistant' as AppNavView,
          name: 'Aroka AI Care Assistant',
          tag: 'Hinglish • Odia • Hindi • Eng',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          icon: Bot,
          desc: 'Unified AI Gateway with tool access to verify listings, check bookings, and answer local Hinjilicut queries.',
          descHi: 'चार भाषाओं में एआई सहायता जो बाज़ार और बुकिंग की सही जानकारी देती है।',
        },
        {
          id: 'voice-care' as AppNavView,
          name: 'Voice Care (8249892208)',
          tag: 'Telephony Voice AI',
          badgeColor: 'bg-amber-100 text-amber-800',
          icon: PhoneCall,
          desc: 'Interactive toll-free voice care simulation with real-time speech synthesis, audio waveforms, and human escalation.',
          descHi: 'आधिकारिक वॉयस कस्टमर केयर नंबर (8249892208) का लाइव कॉलिंग सिम्युलेटर।',
        },
        {
          id: 'telegram-bot' as AppNavView,
          name: 'Telegram Bot (@ArokaAppBot)',
          tag: 'Commands & Alerts',
          badgeColor: 'bg-sky-100 text-sky-800',
          icon: Send,
          desc: 'Telegram assistance channel for local deals and notifications (Strictly NO WhatsApp API).',
          descHi: 'टेलीग्राम पर सेवाएँ, कमांड्स और खाते को लिंक करने की सुविधा।',
        },
      ],
    },
    {
      title: 'Administration & Brand Identity',
      titleHi: 'एडमिन पोर्टल और ब्रांड लोगो',
      items: [
        {
          id: 'admin-portal' as AppNavView,
          name: 'Admin Portal (admin.arokaapp.in)',
          tag: '8 RBAC Roles',
          badgeColor: 'bg-purple-100 text-purple-800',
          icon: ShieldCheck,
          desc: 'Operational management, 9-component observability, KYC queue, report moderation, and audit trail.',
          descHi: 'सिस्टम मॉनिटरिंग, ऑपरेटर रोल्स, केवाईसी रिव्यू और सुरक्षा नियंत्रण।',
        },
      ],
    },
  ];

  const handleSelect = (view: AppNavView) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0A2540] to-emerald-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              <Compass className="w-3.5 h-3.5 text-emerald-300" />
              ArokaApp Full Ecosystem Directory
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              ArokaApp All Services (बाकी सब यहाँ मिलेगा)
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Explore all 10+ modules: Bazar, Companions, Spark Dating, Wallet, Voice AI, Telegram & Admin Portal.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Categorized Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {cat.title} <span className="font-normal text-slate-400">({cat.titleHi})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {cat.items.map(item => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className="group p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/50 bg-slate-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer flex flex-col justify-between space-y-2.5 shadow-xs hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {item.name}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.badgeColor}`}>
                              {item.tag}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all group-hover:translate-x-0.5" />
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                      <p className="text-[10px] text-slate-400 italic">
                        {item.descHi}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Official Brand Logo Section */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Official Brand Assets</span>
              <h4 className="text-xs font-bold text-white">Download Aroka Vector Logo & Color Palette</h4>
              <p className="text-[10px] text-slate-300">SVG Mark, Wordmark, and Brand Style Guide tokens.</p>
            </div>
            {onOpenBrandModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBrandModal();
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                Logo & Assets Modal
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Hinjilicut, Ganjam District, Odisha (761102)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            Close (बंद करें)
          </button>
        </div>
      </div>
    </div>
  );
};
