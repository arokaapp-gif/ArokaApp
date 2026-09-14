import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Filter, 
  Smartphone, 
  Car, 
  Home, 
  Tv, 
  Armchair, 
  Wrench, 
  CheckCircle2, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles,
  Plus
} from 'lucide-react';
import { Listing, AppNavView } from '../types';

interface BazarViewProps {
  listings: Listing[];
  onOpenDealRoom: (listing: Listing) => void;
  onOpenCreate: () => void;
}

export const BazarView: React.FC<BazarViewProps> = ({
  listings,
  onOpenDealRoom,
  onOpenCreate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [radiusFilter, setRadiusFilter] = useState<'2km' | '5km' | '15km' | 'district'>('5km');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeListingModal, setActiveListingModal] = useState<Listing | null>(null);

  const categories = [
    { id: 'all', name: 'All Deals', icon: ShoppingBag },
    { id: 'mobiles', name: 'Mobiles', icon: Smartphone },
    { id: 'vehicles', name: 'Vehicles', icon: Car },
    { id: 'real-estate', name: 'Real Estate', icon: Home },
    { id: 'furniture', name: 'Handloom & Craft', icon: Armchair },
    { id: 'services', name: 'Local Services', icon: Wrench },
  ];

  const filteredListings = listings.filter(item => {
    if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.locality.toLowerCase().includes(q);
    }
    // Radius filter simulation based on distanceKm
    if (radiusFilter === '2km') return item.distanceKm <= 2.0;
    if (radiusFilter === '5km') return item.distanceKm <= 5.0;
    if (radiusFilter === '15km') return item.distanceKm <= 15.0;
    return true; // district
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner with PostGIS Radius Search */}
      <div className="bg-gradient-to-r from-[#0A2540] to-emerald-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-xs text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            PostGIS Hyper-Local Commerce
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Aroka Bazar — Hinjilicut & Ganjam
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Trade electronics, vehicles, handlooms, and real estate with verified neighbours. Chat safely via private Deal Rooms without exposing phone numbers.
          </p>

          {/* Radius Filter Pills */}
          <div className="pt-2 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-emerald-200 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Proximity:
            </span>
            {(['2km', '5km', '15km', 'district'] as const).map(rad => (
              <button
                key={rad}
                onClick={() => setRadiusFilter(rad)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                  radiusFilter === rad
                    ? 'bg-emerald-500 text-slate-950 shadow-sm scale-105'
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
              >
                {rad === 'district' ? 'District (Ganjam)' : `${rad.toUpperCase()} Radius`}
              </button>
            ))}
          </div>
        </div>

        {/* Create Listing Action in Banner */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-6 sm:bottom-6 z-10">
          <button
            onClick={onOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Post a Listing
          </button>
        </div>
      </div>

      {/* Search & Category Tabs */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search phones, bikes, Sambalpuri sarees, Hinjilicut rentals..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Category horizontal scrolling bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#0A2540] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col group"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/11] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setActiveListingModal(item)}>
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.isFeatured && (
                <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-xs">
                  Featured
                </span>
              )}
              <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                {item.distanceKm} km away
              </span>
            </div>

            {/* Listing Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.categoryName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.condition}
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveListingModal(item)}
                  className="font-bold text-sm text-slate-900 mt-1.5 line-clamp-1 cursor-pointer hover:text-emerald-700 transition-colors"
                >
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Price</span>
                  <span className="text-base font-extrabold text-slate-900 font-mono">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenDealRoom(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Deal Room
                </button>
              </div>
            </div>

            {/* Seller Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <img
                  src={item.seller.avatarUrl}
                  alt={item.seller.displayName}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold text-slate-800 text-[11px]">{item.seller.displayName}</span>
                {item.seller.isVerified && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-400">{item.locality}</span>
            </div>
          </div>
        ))}
      </div>

      {/* LISTING DETAIL MODAL */}
      {activeListingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">Aroka Bazar Listing</span>
                <h2 className="text-lg font-bold text-slate-900">{activeListingModal.title}</h2>
              </div>
              <button 
                onClick={() => setActiveListingModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="my-4 aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={activeListingModal.images[0]}
                alt={activeListingModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block">Listed Asking Price</span>
                  <span className="text-2xl font-black text-[#0A2540] font-mono">
                    ₹{activeListingModal.price.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Location Proximity</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {activeListingModal.locality} ({activeListingModal.distanceKm} km away)
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Item Description</h4>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeListingModal.description}
                </p>
              </div>

              {/* Deal Room Safety Guarantee */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-700" />
                  Aroka Private Deal Room Guarantee
                </div>
                <p className="text-[11px] text-emerald-800">
                  Your phone number will NOT be shared. You and the seller communicate securely inside the Aroka Deal Room with order verification and safety protections.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    const item = activeListingModal;
                    setActiveListingModal(null);
                    onOpenDealRoom(item);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enter Deal Room with {activeListingModal.seller.displayName}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
