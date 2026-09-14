import React, { useState } from 'react';
import { Sparkles, Download, Check, Info } from 'lucide-react';

interface ArokaLogoProps {
  variant?: 'full' | 'compact' | 'mark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  enableDownloadModal?: boolean;
}

export const ArokaLogo: React.FC<ArokaLogoProps> = ({
  variant = 'full',
  size = 'md',
  showTagline = true,
  className = '',
  enableDownloadModal = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sizing styles
  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[11px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1',
    xl: 'text-sm px-3.5 py-1.5',
  };

  const taglineSizes = {
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.22em]',
    lg: 'text-xs tracking-[0.25em]',
    xl: 'text-sm tracking-[0.3em]',
  };

  const handleCopySvg = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect x="2" y="2" width="96" height="96" rx="26" fill="#0A2540"/><path d="M 22 76 L 43 24 C 45 19 50 19 52 24 L 61 46" stroke="#60A5FA" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M 50 20 C 57 20 78 50 78 76 C 68 76 60 70 54 62" fill="none" stroke="#10B981" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M 33 54 C 40 48 56 48 64 54 C 69 57 68 64 61 65 C 50 67 40 50 33 54 Z" fill="#10B981"/><circle cx="50" cy="52" r="4.5" fill="#FFFFFF"/><circle cx="50" cy="14" r="3.5" fill="#34D399"/></svg>`;
    navigator.clipboard?.writeText(svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div 
        className={`inline-flex items-center gap-2.5 select-none ${enableDownloadModal ? 'cursor-pointer group' : ''} ${className}`}
        onClick={enableDownloadModal ? () => setIsModalOpen(true) : undefined}
        title={enableDownloadModal ? "Click to view Aroka Brand & Logo Assets" : "ArokaApp Logo"}
      >
        {/* Emblem Graphic — Official Aroka Logo */}
        <div className={`relative flex-shrink-0 ${emblemSizes[size]} transition-transform duration-200 group-hover:scale-105`}>
          <img
            src="/aroka-logo.jpeg"
            alt="Aroka App logo"
            className={`w-full h-full object-contain rounded-xl ${variant === 'white' ? 'bg-white/95 p-0.5 shadow-sm' : 'drop-shadow-sm'}`}
          />
        </div>

        {/* Wordmark and Tagline */}
        {variant !== 'mark' && (
          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-center gap-1.5">
              <span className={`font-extrabold tracking-tight font-sans ${textSizes[size]} ${variant === 'white' ? 'text-white' : 'text-[#0A2540]'}`}>
                AROKA
              </span>
              <span className={`font-bold rounded-md uppercase tracking-wider font-sans bg-emerald-600 text-white ${badgeSizes[size]}`}>
                APP
              </span>
            </div>

            {variant === 'full' && showTagline && size !== 'sm' && (
              <span className={`font-semibold uppercase mt-1 font-sans ${taglineSizes[size]} text-emerald-700`}>
                Connect • Trade • Vibe • Care
              </span>
            )}
          </div>
        )}
      </div>

      {/* Brand & Logo Assets Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-white">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">ArokaApp Official Brand & Logo Kit</h3>
                  <p className="text-xs text-slate-500">Connect. Trade. Vibe. Care. — Hinjilicut, Ganjam, Odisha</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Logo Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Primary Light Lockup</span>
                <ArokaLogo variant="full" size="lg" />
              </div>
              <div className="bg-[#0A2540] p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Dark Surface Lockup</span>
                <ArokaLogo variant="white" size="lg" />
              </div>
            </div>

            {/* Symbolism Breakdown */}
            <div className="space-y-3 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 text-xs text-slate-700">
              <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                Logo Design Semantics & Architectural Geometry:
              </div>
              <ul className="grid grid-cols-2 gap-2 text-slate-600 pl-1">
                <li><strong className="text-slate-900">Royal Blue Arch:</strong> Structural safety, trust, and technological reliability.</li>
                <li><strong className="text-slate-900">Emerald Care Leaf:</strong> Compassion, genuine care, and green growth in Odisha.</li>
                <li><strong className="text-slate-900">Central Loop:</strong> Peer-to-peer marketplace exchange and deal rooms.</li>
                <li><strong className="text-slate-900">Apex Spark Node:</strong> Youthful social vibes, moments, and local vitality.</li>
              </ul>
            </div>

            {/* Download & Copy Buttons */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-6">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">Format: Vector SVG (100x100 & 420x100)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySvg}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  {copied ? 'Copied SVG!' : 'Copy SVG Markup'}
                </button>
                <a
                  href="/logo.svg"
                  download="aroka-logo.svg"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Logo.svg
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
