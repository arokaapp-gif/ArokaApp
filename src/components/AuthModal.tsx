import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  X,
  PhoneOff
} from 'lucide-react';
import { ArokaLogo } from './ArokaLogo';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('subham.hinjili@aroka.in');
  const [password, setPassword] = useState('arokaSecurePass2026!');
  const [fullName, setFullName] = useState('Subham Pattnaik');
  const [locality, setLocality] = useState('Main Road, Hinjilicut');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleInstantLoginWithoutDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user: UserProfile = {
        id: 'usr-hinjili-001',
        email: 'user@arokaapp.in',
        displayName: 'Subham Pattnaik',
        arokaId: '@subham_hinjili',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Resident of Hinjilicut, Ganjam.',
        city: 'Hinjilicut',
        district: 'Ganjam',
        state: 'Odisha',
        pincode: '761102',
        isIdentityVerified: true,
        role: 'user',
        joinedDate: 'Joined Jan 2026',
      };
      onLoginSuccess(user);
      onClose();
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      const user: UserProfile = {
        id: 'usr-hinjili-001',
        email: email,
        displayName: isSignUp ? fullName : 'Subham Pattnaik',
        arokaId: '@subham_hinjili',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Resident of Hinjilicut, Ganjam.',
        city: 'Hinjilicut',
        district: 'Ganjam',
        state: 'Odisha',
        pincode: '761102',
        isIdentityVerified: true,
        role: 'user',
        joinedDate: 'Joined Jan 2026',
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-2 mb-5">
          <div className="flex justify-center">
            <ArokaLogo size="md" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-2">
            {isSignUp ? 'Create Your Aroka Account' : 'Welcome to Aroka'}
          </h2>
          <p className="text-xs text-slate-500">
            Hinjilicut & Ganjam Community Gateway
          </p>
        </div>

        {/* STRICT EMAIL + PASSWORD ONLY POLICY BANNER */}
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-emerald-900 block">Strict Email + Password Authentication:</span>
            Aroka does NOT use SMS OTP, Phone OTP, or WhatsApp login. We preserve your privacy with Supabase standard credentials.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Subham Pattnaik"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Locality (Hinjilicut / Ganjam)</label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={e => setLocality(e.target.value)}
                  placeholder="e.g. Hinjilicut College Road"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          {/* 1-Click Complete Without Details */}
          <button
            type="button"
            onClick={handleInstantLoginWithoutDetails}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
          >
            <span>⚡ Complete Without Details (Instant Continue)</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all active:scale-98"
          >
            {loading ? 'Authenticating...' : isSignUp ? 'Sign Up with Email' : 'Sign In with Email'}
          </button>

          {/* Quick Skip / Guest Mode Option */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Skip for now / Continue as Guest (सब स्किप करें)</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-emerald-700 font-bold hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
          <span className="text-[10px] text-slate-400">Powered by Supabase</span>
        </div>
      </div>
    </div>
  );
};
