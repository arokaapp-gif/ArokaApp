import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  MessageCircle, 
  Flame, 
  Info,
  Check
} from 'lucide-react';
import { SparkProfile, AppNavView } from '../types';

interface SparkViewProps {
  profiles: SparkProfile[];
  onNavigate: (view: AppNavView) => void;
}

export const SparkView: React.FC<SparkViewProps> = ({ profiles, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<SparkProfile | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (direction: 'like' | 'pass' | 'super') => {
    if (direction === 'like' || direction === 'super') {
      // Simulate mutual match on like!
      if (currentProfile) {
        setMatchedProfile(currentProfile);
      }
    } else {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setActivePhotoIdx(0);
      } else {
        setCurrentIndex(0); // Loop for demo
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-5">
      {/* Strict Privacy Isolation Notice Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-950 flex items-start gap-2.5 shadow-xs">
        <Lock className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-rose-900">Strict Privacy Isolation</span>
          <p className="text-[11px] text-rose-800 leading-normal">
            Your Spark profile and activity are strictly isolated from your Aroka Social feed and Bazar presence. Only mutual matches can message you.
          </p>
        </div>
      </div>

      {/* SWIPE CARD CONTAINER */}
      {currentProfile ? (
        <div className="relative aspect-[3/4.2] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group select-none">
          {/* Photos */}
          <img
            src={currentProfile.photos[activePhotoIdx] || currentProfile.photos[0]}
            alt={currentProfile.displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/40"></div>

          {/* Photo Pagination Bars */}
          {currentProfile.photos.length > 1 && (
            <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
              {currentProfile.photos.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`h-1 flex-1 rounded-full cursor-pointer transition-all ${
                    i === activePhotoIdx ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Spark Badge */}
          <div className="absolute top-6 left-4 z-10 flex items-center gap-1.5 bg-rose-600/90 backdrop-blur-xs text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-white" />
            Aroka Spark
          </div>

          {/* Profile Bio Details */}
          <div className="absolute bottom-20 left-4 right-4 text-white space-y-2 z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black">{currentProfile.displayName}, {currentProfile.age}</h2>
              {currentProfile.verified && (
                <ShieldCheck className="w-5 h-5 text-emerald-400 fill-emerald-400/20" title="Verified Photo" />
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{currentProfile.locality} • {currentProfile.distanceKm} km away</span>
            </div>

            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
              {currentProfile.bio}
            </p>

            {/* Interest Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentProfile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: Pass / Super Like / Like */}
          <div className="absolute bottom-4 left-0 right-0 px-6 flex items-center justify-around z-10">
            {/* Pass */}
            <button
              onClick={() => handleSwipe('pass')}
              className="w-13 h-13 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:text-rose-600 flex items-center justify-center shadow-lg transition-transform active:scale-90"
              title="Pass"
            >
              <X className="w-6 h-6 stroke-[2.5px]" />
            </button>

            {/* Super Like */}
            <button
              onClick={() => handleSwipe('super')}
              className="w-11 h-11 rounded-full bg-sky-500/90 text-white hover:bg-sky-500 flex items-center justify-center shadow-lg transition-transform active:scale-90"
              title="Super Like"
            >
              <Star className="w-5 h-5 fill-white" />
            </button>

            {/* Like */}
            <button
              onClick={() => handleSwipe('like')}
              className="w-13 h-13 rounded-full bg-rose-600 text-white hover:bg-rose-700 flex items-center justify-center shadow-lg transition-transform active:scale-90"
              title="Like"
            >
              <Heart className="w-6 h-6 fill-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <Sparkles className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">You've seen all local profiles!</h3>
          <p className="text-xs text-slate-500">
            Expand your search radius in Ganjam or check back soon as more local Hinjilicut members join.
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl"
          >
            Review Again
          </button>
        </div>
      )}

      {/* MUTUAL MATCH UNLOCK MODAL */}
      {matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-950 text-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-rose-500/40 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-600/30 text-rose-400 mx-auto flex items-center justify-center animate-pulse">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">It's a Mutual Match!</span>
              <h2 className="text-xl font-black mt-1">You and {matchedProfile.displayName} liked each other</h2>
              <p className="text-xs text-slate-400 mt-1">
                A private encrypted chat is unlocked. Phone numbers are never revealed.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="You"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-400"
              />
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
              <img
                src={matchedProfile.photos[0]}
                alt={matchedProfile.displayName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-500"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setMatchedProfile(null);
                  onNavigate('connect');
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send Private Spark Message
              </button>
              <button
                onClick={() => {
                  setMatchedProfile(null);
                  if (currentIndex < profiles.length - 1) setCurrentIndex(prev => prev + 1);
                }}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
