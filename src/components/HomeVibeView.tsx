import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MapPin, 
  Tag, 
  Sparkles, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  Flag, 
  Flame, 
  ShoppingBag,
  Users,
  Compass,
  ArrowRight,
  LayoutGrid,
  HeartHandshake,
  Wallet,
  Bot,
  PhoneCall,
  Send,
  ShieldCheck
} from 'lucide-react';
import { Post, Clip, Moment, AppNavView } from '../types';

interface HomeVibeViewProps {
  posts: Post[];
  clips: Clip[];
  moments: Moment[];
  onNavigate: (view: AppNavView) => void;
  onOpenCreate: () => void;
  onLikePost: (postId: string) => void;
  onOpenHub?: () => void;
}

export const HomeVibeView: React.FC<HomeVibeViewProps> = ({
  posts,
  clips,
  moments,
  onNavigate,
  onOpenCreate,
  onLikePost,
  onOpenHub,
}) => {
  const [activeTab, setActiveTab] = useState<'following' | 'explore' | 'clips'>('following');
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);
  const [activeCarouselIndices, setActiveCarouselIndices] = useState<Record<string, number>>({});
  const [reportedPostId, setReportedPostId] = useState<string | null>(null);

  const nextSlide = (postId: string, total: number) => {
    setActiveCarouselIndices(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % total,
    }));
  };

  const prevSlide = (postId: string, total: number) => {
    setActiveCarouselIndices(prev => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + total) % total,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* 24-HOUR MOMENTS (STORIES) TRAY */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Aroka Moments</span>
            <span className="text-[10px] text-slate-400 font-medium">(24h Expiring Stories)</span>
          </div>
          <button 
            onClick={onOpenCreate}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Moment
          </button>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {/* User Add Moment Node */}
          <div 
            onClick={onOpenCreate}
            className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
          >
            <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/80 p-0.5 flex items-center justify-center bg-emerald-50/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Plus className="w-6 h-6 stroke-[2.5px]" />
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-700">Your Story</span>
          </div>

          {/* Active Moments */}
          {moments.map(m => (
            <div
              key={m.id}
              onClick={() => setActiveMoment(m)}
              className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
            >
              <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-emerald-500 via-[#1E3A8A] to-teal-400 group-hover:scale-105 transition-transform">
                <img
                  src={m.author.avatarUrl}
                  alt={m.author.displayName}
                  className="w-full h-full rounded-full object-cover ring-2 ring-white"
                />
              </div>
              <span className="text-[11px] font-medium text-slate-700 truncate max-w-[70px]">
                {m.author.displayName.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ECOSYSTEM QUICK ACCESS HUB ("BAAKI SAB KAISE AUR KIDHAR MILEGA") */}
      <div className="bg-gradient-to-r from-[#0A2540] via-slate-900 to-emerald-950 rounded-2xl p-4 text-white shadow-md border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Aroka Ecosystem (बाकी सब सेवाएँ)
            </span>
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
              10+ Modules
            </span>
          </div>

          <button
            onClick={() => onOpenHub ? onOpenHub() : onNavigate('bazar')}
            className="text-[11px] font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 transition-colors"
          >
            <span>सभी देखें (All Hub)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Launch Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          <button
            onClick={() => onNavigate('bazar')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Aroka Bazar</span>
              <span className="text-[10px] text-slate-300 block truncate">2-15km Local</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('companions')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Companions</span>
              <span className="text-[10px] text-slate-300 block truncate">Study & Peer</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('spark')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Spark Dating</span>
              <span className="text-[10px] text-slate-300 block truncate">Private Swipe</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('wallet')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Aroka Wallet</span>
              <span className="text-[10px] text-slate-300 block truncate">₹ Ledger & UPI</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('voice-care')}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all hover:scale-[1.02] flex items-center gap-2 col-span-2 sm:col-span-1"
          >
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold block truncate">Voice Care</span>
              <span className="text-[10px] text-slate-300 block truncate">8249892208</span>
            </div>
          </button>
        </div>
      </div>

      {/* FEED SUB-TABS: FOLLOWING / EXPLORE / CLIPS */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'following'
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'explore'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Explore Hinjilicut
          </button>
          <button
            onClick={() => setActiveTab('clips')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'clips'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Clips (90s)
          </button>
        </div>

        {/* Discovery pill to Bazar */}
        <button
          onClick={() => onNavigate('bazar')}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
          Nearby Bazar Deals
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* VIEW: CLIPS (VERTICAL 90s REELS) */}
      {activeTab === 'clips' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clips.map(clip => (
            <div key={clip.id} className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 flex flex-col">
              <div className="relative aspect-[9/14] bg-slate-950 flex items-center justify-center overflow-hidden group">
                <img 
                  src={clip.thumbnailUrl} 
                  alt={clip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                {/* Duration Badge */}
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                  0:{clip.durationSeconds}s
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-white/50 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Clip Info overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <img 
                      src={clip.author.avatarUrl} 
                      alt={clip.author.displayName}
                      className="w-8 h-8 rounded-full border border-white/60 object-cover" 
                    />
                    <div>
                      <span className="text-xs font-bold block">{clip.author.displayName}</span>
                      <span className="text-[10px] text-slate-300 font-mono">{clip.soundTitle}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2">{clip.title}</p>
                </div>
              </div>

              {/* Clip Actions */}
              <div className="p-3 bg-slate-900 flex items-center justify-between text-slate-300 text-xs">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-rose-400">
                    <Heart className={`w-4 h-4 ${clip.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{clip.likesCount}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{clip.commentsCount}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-400">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-400">{clip.viewsCount} views</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* VIEW: POSTS FEED (FOLLOWING & EXPLORE) */
        <div className="space-y-6">
          {posts.map(post => {
            const currentCarouselIndex = activeCarouselIndices[post.id] || 0;
            const hasMultipleImages = post.mediaUrls.length > 1;

            return (
              <article key={post.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {/* Post Author Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.displayName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900">{post.author.displayName}</span>
                        {post.author.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        )}
                        <span className="text-xs text-slate-400">{post.author.arokaId}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{post.locationName}</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Options */}
                  <div className="relative">
                    <button 
                      onClick={() => setReportedPostId(reportedPostId === post.id ? null : post.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50"
                      title="Post Options & Report"
                    >
                      <Flag className="w-4 h-4" />
                    </button>
                    {reportedPostId === post.id && (
                      <div className="absolute right-0 top-8 z-10 w-44 bg-white rounded-xl shadow-lg border border-slate-200 p-2 text-xs">
                        <button 
                          onClick={() => {
                            alert('Post reported to Aroka Trust & Safety team. Ref #REP-8910');
                            setReportedPostId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-medium"
                        >
                          Report Post
                        </button>
                        <button 
                          onClick={() => setReportedPostId(null)}
                          className="w-full text-left px-3 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>

                  {/* Hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tagged Bazar Item Context */}
                  {post.taggedListingId && (
                    <div 
                      onClick={() => onNavigate('bazar')}
                      className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Tagged Aroka Bazar Listing</span>
                          <span className="text-[11px] text-slate-500">Tap to view price & enter Deal Room</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">View Listing →</span>
                    </div>
                  )}
                </div>

                {/* Image Carousel (Max 10 images) */}
                {post.mediaUrls && post.mediaUrls.length > 0 && (
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={post.mediaUrls[currentCarouselIndex]}
                      alt="Post media"
                      className="w-full h-full object-cover"
                    />

                    {/* Left / Right Carousel Controls */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={() => prevSlide(post.id, post.mediaUrls.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => nextSlide(post.id, post.mediaUrls.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        {/* Dot indicator */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {post.mediaUrls.map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all ${
                                i === currentCarouselIndex ? 'bg-emerald-500 w-4' : 'bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Post Footer Actions */}
                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-slate-600 text-xs font-semibold">
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.isLiked ? 'text-rose-600' : 'hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-sky-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>{post.sharesCount}</span>
                    </button>
                  </div>

                  <button className="text-slate-400 hover:text-slate-700">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* MOMENT PREVIEW MODAL */}
      {activeMoment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            {/* 24h Progress bar */}
            <div className="absolute top-3 left-3 right-3 z-10 flex gap-1">
              <div className="h-1 flex-1 bg-white rounded-full"></div>
            </div>

            {/* Moment Header */}
            <div className="absolute top-6 left-4 right-4 z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <img 
                  src={activeMoment.author.avatarUrl} 
                  alt={activeMoment.author.displayName}
                  className="w-8 h-8 rounded-full border border-white/60 object-cover" 
                />
                <div>
                  <span className="text-xs font-bold block">{activeMoment.author.displayName}</span>
                  <span className="text-[10px] text-slate-300">Expires in {activeMoment.expiresInHours}h</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveMoment(null)}
                className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Moment Visual */}
            <div className="aspect-[9/16] relative flex items-center justify-center">
              <img 
                src={activeMoment.mediaUrl} 
                alt="Moment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

              {/* Text & Location Overlay */}
              <div className="absolute bottom-8 left-4 right-4 space-y-3">
                {activeMoment.locationSticker && (
                  <div className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-md">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeMoment.locationSticker}
                  </div>
                )}
                {activeMoment.textOverlay && (
                  <p className="text-white text-base font-bold drop-shadow-md">
                    {activeMoment.textOverlay}
                  </p>
                )}

                {/* Poll Sticker */}
                {activeMoment.poll && (
                  <div className="bg-white/95 rounded-2xl p-3 text-slate-900 space-y-2 shadow-lg">
                    <span className="text-xs font-bold block">{activeMoment.poll.question}</span>
                    <div className="space-y-1.5">
                      {activeMoment.poll.options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => alert(`Voted: ${opt.text}`)}
                          className="w-full text-left p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-xs font-semibold flex justify-between items-center transition-colors"
                        >
                          <span>{opt.text}</span>
                          <span className="text-slate-500 text-[10px]">{opt.votes} votes</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
