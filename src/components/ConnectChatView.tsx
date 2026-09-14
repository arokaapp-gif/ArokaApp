import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  Video, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  CheckCheck, 
  Lock, 
  MoreVertical, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Camera,
  CameraOff,
  ChevronLeft
} from 'lucide-react';
import { Conversation, ChatMessage } from '../types';

interface ConnectChatViewProps {
  conversations: Conversation[];
  activeChatMessages: Record<string, ChatMessage[]>;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const ConnectChatView: React.FC<ConnectChatViewProps> = ({
  conversations,
  activeChatMessages,
  onSendMessage,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv-01');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [inputText, setInputText] = useState('');
  const [activeCallType, setActiveCallType] = useState<'audio' | 'video' | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [ephemeralDuration, setEphemeralDuration] = useState<'none' | '24h' | '7d'>('none');

  const currentConv = conversations.find(c => c.id === selectedConvId) || conversations[0];
  const messages = activeChatMessages[selectedConvId] || [];

  const handleSelectConv = (id: string) => {
    setSelectedConvId(id);
    setShowMobileChat(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(selectedConvId, inputText);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-[calc(100vh-12rem)] min-h-[550px] flex">
        {/* LEFT PANEL: CONVERSATIONS LIST */}
        <div className={`${showMobileChat ? 'hidden sm:flex' : 'flex'} w-full sm:w-80 border-r border-slate-200 flex-col bg-slate-50/50`}>
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="text-sm font-bold text-slate-900">Aroka Connect & Deal Rooms</h2>
            <p className="text-[10px] text-slate-500 mt-0.5">End-to-end private messaging • Phone numbers hidden</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map(conv => {
              const isSelected = conv.id === selectedConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-white'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.participant.avatarUrl}
                      alt={conv.participant.displayName}
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    {conv.participant.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {conv.participant.displayName}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {conv.lastMessage.timestamp}
                      </span>
                    </div>

                    {/* Deal Room or Match tag */}
                    {conv.type === 'deal_room' && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-sm mt-0.5">
                        <ShoppingBag className="w-2.5 h-2.5" />
                        Bazar Deal Room
                      </span>
                    )}
                    {conv.type === 'spark_match' && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase text-rose-700 bg-rose-100/60 px-1.5 py-0.5 rounded-sm mt-0.5">
                        Spark Match
                      </span>
                    )}

                    <p className="text-xs text-slate-500 truncate mt-1">
                      {conv.lastMessage.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: CHAT VIEWPORT */}
        {currentConv ? (
          <div className={`${showMobileChat ? 'flex' : 'hidden sm:flex'} flex-1 flex-col bg-white`}>
            {/* Chat Top Header */}
            <div className="p-3.5 px-4 sm:px-5 border-b border-slate-200 flex items-center justify-between bg-white/95">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button 
                  onClick={() => setShowMobileChat(false)}
                  className="sm:hidden p-1.5 -ml-1 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                  title="Back to conversations"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <img
                  src={currentConv.participant.avatarUrl}
                  alt={currentConv.participant.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">{currentConv.participant.displayName}</span>
                    <span className="text-xs text-slate-400 font-normal">{currentConv.participant.arokaId}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Protected Aroka Gateway • Direct Call & Message</span>
                  </div>
                </div>
              </div>

              {/* Call Buttons & Ephemeral Options */}
              <div className="flex items-center gap-2">
                {/* Ephemeral selector */}
                <div className="hidden md:flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Timer:</span>
                  <select
                    value={ephemeralDuration}
                    onChange={e => setEphemeralDuration(e.target.value as any)}
                    className="bg-transparent border-none text-slate-800 text-[10px] font-bold focus:outline-hidden cursor-pointer"
                  >
                    <option value="none">Off</option>
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                  </select>
                </div>

                {/* WebRTC Audio Call */}
                <button
                  onClick={() => setActiveCallType('audio')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
                  title="Secure Voice Call (No phone number shared)"
                >
                  <Phone className="w-4 h-4" />
                </button>

                {/* WebRTC Video Call */}
                <button
                  onClick={() => setActiveCallType('video')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
                  title="Secure Video Call (No phone number shared)"
                >
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Deal Room Listing Context Header Banner */}
            {currentConv.listingContext && (
              <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentConv.listingContext.thumbnail}
                    alt="Listing thumbnail"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">{currentConv.listingContext.title}</span>
                    <span className="text-[11px] font-bold text-emerald-800 font-mono">
                      Asking: ₹{currentConv.listingContext.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-200/60 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                  Active Deal Context
                </span>
              </div>
            )}

            {/* Chat Messages Log */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-slate-50/30">
              <div className="text-center my-2">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  Messages and calls are encrypted. Phone numbers are never exposed.
                </span>
              </div>

              {messages.map(msg => {
                const isMine = msg.senderId === 'usr-hinjili-001';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                        isMine
                          ? 'bg-[#0A2540] text-white rounded-br-xs'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      <p>{msg.content}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 px-1">
                      <span>{msg.timestamp}</span>
                      {isMine && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${currentConv.participant.displayName.split(' ')[0]}...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
            Select a conversation or Deal Room to begin chatting.
          </div>
        )}
      </div>

      {/* SECURE CALL MODAL SIMULATION (NO PHONE NUMBER EXPOSURE) */}
      {activeCallType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-800 space-y-6">
            <div className="space-y-2">
              <div className="relative w-24 h-24 rounded-full mx-auto overflow-hidden ring-4 ring-emerald-500/40">
                <img
                  src={currentConv.participant.avatarUrl}
                  alt={currentConv.participant.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{currentConv.participant.displayName}</h3>
              <p className="text-xs text-emerald-400 font-mono">
                Aroka Secure WebRTC Call • Connected (00:34)
              </p>
              <div className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Zero Phone Number Exposure
              </div>
            </div>

            {/* Video preview simulation if video call */}
            {activeCallType === 'video' && (
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-700">
                <img
                  src={currentConv.participant.avatarUrl}
                  alt="Video feed"
                  className="w-full h-full object-cover opacity-80"
                />
                <span className="absolute top-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded-sm">720p HD WebRTC</span>
              </div>
            )}

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isMuted ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
                title="Mute/Unmute"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {activeCallType === 'video' && (
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    !isVideoEnabled ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  title="Camera On/Off"
                >
                  {isVideoEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </button>
              )}

              {/* End Call */}
              <button
                onClick={() => setActiveCallType(null)}
                className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
