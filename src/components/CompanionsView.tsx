import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Star, 
  Calendar, 
  Clock, 
  ArrowRight,
  Filter,
  Info,
  Check
} from 'lucide-react';
import { CompanionProfile, CompanionBooking } from '../types';

interface CompanionsViewProps {
  companions: CompanionProfile[];
  onBookSession: (booking: CompanionBooking) => void;
}

export const CompanionsView: React.FC<CompanionsViewProps> = ({
  companions,
  onBookSession,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingModalCompanion, setBookingModalCompanion] = useState<CompanionProfile | null>(null);
  const [sessionHours, setSessionHours] = useState<number>(1);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'all', name: 'All Companions' },
    { id: 'Study Buddy', name: 'Study Buddy' },
    { id: 'Skill Partner', name: 'Skill Partner' },
    { id: 'Heart-to-Heart / Venting', name: 'Heart-to-Heart / Venting' },
    { id: 'Elder Companion', name: 'Elder Companion' },
    { id: 'Leisure Companion', name: 'Leisure Companion' },
  ];

  const filtered = companions.filter(c => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const handleConfirmBooking = () => {
    if (!bookingModalCompanion) return;
    const total = bookingModalCompanion.hourlyRate * sessionHours;
    const platformCommission = Math.round(total * 0.20); // 20%
    const companionPayout = total - platformCommission;  // 80%

    const newBooking: CompanionBooking = {
      id: 'book-' + Date.now(),
      companionId: bookingModalCompanion.id,
      companionName: bookingModalCompanion.displayName,
      clientName: 'Subham Pattnaik',
      category: bookingModalCompanion.category,
      dateTime: 'Tomorrow, 04:00 PM',
      durationMinutes: sessionHours * 60,
      totalAmount: total,
      platformFee: platformCommission,
      companionPayout: companionPayout,
      status: 'booked',
    };

    onBookSession(newBooking);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalCompanion(null);
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner with Mandatory Disclaimer */}
      <div className="bg-gradient-to-r from-[#0A2540] via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
          Aroka Companionship & Peer Support
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Connect with Verified Local Companions & Mentors
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Book trusted peer study buddies, skill coding partners, empathetic listeners, and senior care assistance in Hinjilicut & Ganjam. All companions are KYC verified.
        </p>

        {/* MANDATORY LEGAL & HEALTH DISCLAIMER */}
        <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
              Important Health & Safety Notice:
            </span>
            <p className="text-[11px] text-amber-100/90 leading-normal">
              Aroka Companion services are <strong>NOT medical care</strong> and <strong>NOT professional psychotherapy</strong>. Companions provide friendly social presence, peer tutoring, and informal empathetic listening. We never make clinical, diagnostic, or psychiatric claims.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* COMPANION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(comp => (
          <div
            key={comp.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={comp.avatarUrl}
                  alt={comp.displayName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                />
                {comp.isOnline && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" title="Online now"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{comp.displayName}</h3>
                    {comp.isKycVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 flex-shrink-0" title="KYC Verified" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{comp.rating.toFixed(2)}</span>
                  </div>
                </div>

                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">
                  {comp.category}
                </span>

                <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                  {comp.headline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
              {comp.bio}
            </p>

            {/* Languages & Badges */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-slate-400 font-medium">Speaks:</span>
                {comp.languages.map((lang, idx) => (
                  <span key={idx} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {lang}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-slate-400">{comp.sessionsCompleted} sessions</span>
            </div>

            {/* Price & Book Button */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Session Fee</span>
                <span className="text-base font-extrabold text-[#0A2540] font-mono">
                  ₹{comp.hourlyRate}/hour
                </span>
              </div>

              <button
                onClick={() => setBookingModalCompanion(comp)}
                className="px-4 py-2 rounded-xl bg-[#0A2540] hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Book Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL WITH TRANSPARENT COMMISSION BREAKDOWN */}
      {bookingModalCompanion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-7 h-7 stroke-[3px]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Session Booked Successfully!</h3>
                <p className="text-xs text-slate-500">
                  Your session with {bookingModalCompanion.displayName} has been created and logged in the immutable wallet ledger.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">Aroka Companion Booking</span>
                    <h3 className="text-base font-bold text-slate-900">{bookingModalCompanion.displayName}</h3>
                  </div>
                  <button 
                    onClick={() => setBookingModalCompanion(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Duration Picker */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Select Duration (Hours)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map(hrs => (
                      <button
                        key={hrs}
                        onClick={() => setSessionHours(hrs)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          sessionHours === hrs
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {hrs} {hrs === 1 ? 'Hour' : 'Hours'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transparent Commission & Pricing Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Transparent Pricing & Payout:</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">80/20 Model</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Hourly Rate</span>
                    <span className="font-mono font-semibold">₹{bookingModalCompanion.hourlyRate} × {sessionHours}h</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Companion Direct Earning (80%)</span>
                    <span className="font-mono font-semibold text-emerald-700">
                      ₹{Math.round(bookingModalCompanion.hourlyRate * sessionHours * 0.80)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Platform Trust & Safety Fee (20%)</span>
                    <span className="font-mono font-semibold text-slate-500">
                      ₹{Math.round(bookingModalCompanion.hourlyRate * sessionHours * 0.20)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-slate-900">
                    <span>Total Amount Payable</span>
                    <span className="font-mono text-emerald-800 text-base">
                      ₹{bookingModalCompanion.hourlyRate * sessionHours}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-tight flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Session payment will be safely held in wallet escrow until completion.</span>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setBookingModalCompanion(null)}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Confirm & Pay ₹{bookingModalCompanion.hourlyRate * sessionHours}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
