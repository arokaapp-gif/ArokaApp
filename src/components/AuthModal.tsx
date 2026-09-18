import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { ArokaLogo } from './ArokaLogo';
import { UserProfile } from '../types';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [locality, setLocality] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const getUserProfile = async (authUser: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  };

  const convertToArokaUser = (authUser: any, profile: any): UserProfile => ({
    id: authUser.id,
    email: authUser.email || '',
    displayName:
      profile?.display_name ||
      authUser.user_metadata?.display_name ||
      'Aroka User',
    arokaId: profile?.username
      ? `@${profile.username}`
      : `@aroka_${authUser.id.slice(0, 8)}`,
    avatarUrl: profile?.avatar_url || DEFAULT_AVATAR,
    bio: profile?.bio || '',
    city:
      profile?.city ||
      authUser.user_metadata?.locality ||
      'Hinjilicut',
    district: profile?.district || 'Ganjam',
    state: profile?.state || 'Odisha',
    pincode: profile?.pincode || '761102',
    contactPhone: profile?.phone || undefined,
    isIdentityVerified: false,
    role: profile?.role || 'user',
    joinedDate: profile?.created_at
      ? `Joined ${new Date(profile.created_at).toLocaleDateString(
          'en-IN',
          {
            month: 'short',
            year: 'numeric',
          }
        )}`
      : 'Joined now',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          throw new Error('Please enter your full name.');
        }

        if (!locality.trim()) {
          throw new Error('Please enter your locality.');
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              display_name: fullName.trim(),
              locality: locality.trim(),
            },
          },
        });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error('Account creation failed. Please try again.');
        }

        // Supabase may require email verification before creating a session.
        if (!data.session) {
          setSuccessMsg(
            'Account created successfully. Please verify your email, then sign in.'
          );
          setIsSignUp(false);
          setPassword('');
          return;
        }

        const profile = await getUserProfile(data.user);

        onLoginSuccess(convertToArokaUser(data.user, profile));
        onClose();
      } else {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error('Login failed. Please try again.');
        }

        const profile = await getUserProfile(data.user);

        onLoginSuccess(convertToArokaUser(data.user, profile));
        onClose();
      }
    } catch (error: any) {
      setErrorMsg(
        error?.message ||
          'Authentication failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMsg('Please enter your email address first.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: window.location.origin,
          }
        );

      if (error) {
        throw error;
      }

      setSuccessMsg(
        'Password reset email sent. Please check your inbox.'
      );
    } catch (error: any) {
      setErrorMsg(
        error?.message ||
          'Could not send password reset email.'
      );
    } finally {
      setLoading(false);
    }
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

        <div className="text-center space-y-2 mb-5">
          <div className="flex justify-center">
            <ArokaLogo size="md" />
          </div>

          <h2 className="text-xl font-black text-slate-900 mt-2">
            {isSignUp
              ? 'Create Your Aroka Account'
              : 'Welcome to Aroka'}
          </h2>

          <p className="text-xs text-slate-500">
            Hinjilicut & Ganjam Community Gateway
          </p>
        </div>

        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />

          <div className="text-[11px] leading-tight">
            <span className="font-bold text-emerald-900 block">
              Email + Password Authentication
            </span>

            No SMS OTP, Phone OTP, or WhatsApp login.
          </div>
        </div>

        {errorMsg && (
          <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">

          {isSignUp && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Locality
                </label>

                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) =>
                    setLocality(e.target.value)
                  }
                  placeholder="e.g. Hinjilicut"
                  className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email Address
            </label>

            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="name@example.com"
                autoComplete="email"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Password
            </label>

            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                autoComplete={
                  isSignUp ? 'new-password' : 'current-password'
                }
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          {!isSignUp && (
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="text-xs text-emerald-700 font-semibold hover:underline disabled:opacity-50"
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#0A2540] hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : isSignUp
              ? 'Create Account'
              : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Continue as Guest
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">

          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className="text-emerald-700 font-bold hover:underline"
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"}
          </button>

          <span className="text-[10px] text-slate-400">
            Powered by Supabase
          </span>
        </div>
      </div>
    </div>
  );
};
