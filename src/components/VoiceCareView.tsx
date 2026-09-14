import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  ShieldAlert, 
  Bot, 
  Headphones, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const VoiceCareView: React.FC = () => {
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<'hinglish' | 'hindi' | 'english' | 'odia'>('hinglish');
  const [agentEscalated, setAgentEscalated] = useState(false);
  const [transcript, setTranscript] = useState<Array<{ speaker: 'AI' | 'User' | 'Human'; text: string }>>([]);

  const officialNumber = '8249892208';
  const openingGreeting = "Namaste, Aroka Customer Care mein aapka swagat hai. Main Aroka AI Assistant hoon. Main aapki account, Bazar, Companion, payment, technical ya support related help kar sakta hoon. Aap mujhe batayein, main aapki kaise madad kar sakta hoon?";

  useEffect(() => {
    let timer: any;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callActive]);

  const startVoiceCall = () => {
    setCallActive(true);
    setAgentEscalated(false);
    setTranscript([
      { speaker: 'AI', text: openingGreeting }
    ]);

    // Browser Speech Synthesis playback if available
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(openingGreeting);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // speech audio fallback
      }
    }
  };

  const endVoiceCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallActive(false);
  };

  const simulateUserInput = (text: string) => {
    setTranscript(prev => [...prev, { speaker: 'User', text }]);
    setTimeout(() => {
      let reply = '';
      if (text.includes('bazar') || text.includes('phone')) {
        reply = "Aroka Bazar mein aap Hinjilicut aur Ganjam ke verified local sellers se direct deal kar sakte hain bina phone number share kiye. Kya aap kisi specific product category ke baare mein janna chahte hain?";
      } else if (text.includes('companion')) {
        reply = "Aroka Companions peer study buddies aur empathetic listeners provide karta hai. Dhayan rahe yeh medical therapy nahi hai. Booking ke liye aap Aroka App use kar sakte hain.";
      } else if (text.includes('human') || text.includes('agent')) {
        handleEscalate();
        return;
      } else {
        reply = "Ji bilkul, main aapki poori madad karunga. Kya aap mujhe apne ticket ya order ke baare mein bata sakte hain?";
      }

      setTranscript(prev => [...prev, { speaker: 'AI', text: reply }]);
      if ('speechSynthesis' in window) {
        try {
          const utterance = new SpeechSynthesisUtterance(reply);
          window.speechSynthesis.speak(utterance);
        } catch (e) {}
      }
    }, 1200);
  };

  const handleEscalate = () => {
    setAgentEscalated(true);
    const msg = "Aapki call Aroka Hinjilicut support team ke human officer ko transfer ki ja rahi hai. Kripya line par bane rahein (Ref #SUP-VOICE-824).";
    setTranscript(prev => [...prev, { speaker: 'Human', text: msg }]);
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(msg);
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Official Line Banner */}
      <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
          <PhoneCall className="w-3.5 h-3.5" />
          Official Customer Care Line
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-emerald-400">
            {officialNumber}
          </h1>
          <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
            (Toll-Free Voice AI Customer Care)
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Available in Hindi, English, Hinglish, and Odia. Powered by Aroka AI Voice Gateway with seamless human escalation.
        </p>

        {/* CRITICAL STRICT NOTICE */}
        <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-300 block uppercase tracking-wider text-[10px]">
              Critical Authentication Policy:
            </span>
            <p className="text-[11px] text-rose-100/90">
              This number (<strong>{officialNumber}</strong>) is <strong>ONLY</strong> for customer-care voice assistance. It is <strong>NOT</strong> an OTP line, login credential, or WhatsApp contact. Aroka strictly authenticates accounts using Supabase Email + Password.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE VOICE CALL TERMINAL */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-6">
        {!callActive ? (
          <div className="space-y-4 max-w-md">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
              <Headphones className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Experience Aroka Voice AI</h3>
              <p className="text-xs text-slate-500 mt-1">
                Test the official telephony voice care pipeline directly in your browser. Speech synthesis and live transcript active.
              </p>
            </div>

            <div className="flex justify-center gap-2">
              {(['hinglish', 'hindi', 'english', 'odia'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    language === l ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={startVoiceCall}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <PhoneCall className="w-5 h-5" />
              Dial 8249892208 (Voice Care)
            </button>
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  CALL IN PROGRESS ({formatSeconds(callDuration)})
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                Line: {officialNumber}
              </span>
            </div>

            {/* Simulated Animated Waveform */}
            <div className="h-16 flex items-center justify-center gap-1.5 py-2">
              {[40, 65, 85, 30, 95, 75, 45, 60, 90, 35, 70, 50, 80].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1.5 bg-emerald-500 rounded-full transition-all duration-300 animate-pulse"
                />
              ))}
            </div>

            {/* Live Call Transcript */}
            <div className="max-h-56 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Live Speech-to-Text Transcript:
              </span>
              {transcript.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className={`font-bold font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                    item.speaker === 'AI' 
                      ? 'bg-[#0A2540] text-emerald-300' 
                      : item.speaker === 'Human'
                      ? 'bg-amber-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {item.speaker}:
                  </span>
                  <span className="text-slate-800 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Suggested Spoken Phrases to Test */}
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Simulate Customer Speaking:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => simulateUserInput("Bazar mein mobile kaise khareedein?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  "Bazar mein mobile kaise khareedein?"
                </button>
                <button
                  onClick={() => simulateUserInput("Companions study buddy kaise book karein?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  "Companions study buddy kaise book karein?"
                </button>
                <button
                  onClick={() => simulateUserInput("Mujhe human support officer se baat karni hai")}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-medium border border-amber-200"
                >
                  "Mujhe human agent se baat karni hai"
                </button>
              </div>
            </div>

            {/* In-Call Controls */}
            <div className="pt-2 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full ${isMuted ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                title="Mute Mic"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEscalate}
                disabled={agentEscalated}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
              >
                {agentEscalated ? 'Officer Connected' : 'Escalate to Human Agent'}
              </button>

              <button
                onClick={endVoiceCall}
                className="p-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-transform active:scale-95"
                title="Disconnect Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
