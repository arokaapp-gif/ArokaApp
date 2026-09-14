import React, { useState } from 'react';
import { ShoppingBag, MapPin, Camera, X } from 'lucide-react';
import { Listing } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitListing: (listing: Listing) => void;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  onSubmitListing,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('mobiles');
  const [categoryName, setCategoryName] = useState('Mobiles');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Good' | 'Fair'>('Like New');
  const [locality, setLocality] = useState('Main Road, Hinjilicut');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleQuickPostWithoutDetails = () => {
    const samples = [
      {
        title: 'OnePlus 11R 5G (16GB RAM / 256GB)',
        category: 'mobiles',
        categoryName: 'Mobiles',
        price: 26500,
        condition: 'Like New' as const,
        locality: 'Main Road, Hinjilicut',
        description: 'Original 100W SuperVOOC charger and bill included. No scratches, used with tempered glass.',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Sambalpuri Handloom Cotton Ikat Kurta',
        category: 'furniture',
        categoryName: 'Handloom & Craft',
        price: 1850,
        condition: 'Brand New' as const,
        locality: 'Craft Center, Hinjilicut',
        description: 'Authentic pure organic handwoven Sambalpuri fabric from local Odisha artisans.',
        img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
      },
      {
        title: 'Honda Activa 6G (2023 Edition) - Single Owner',
        category: 'vehicles',
        categoryName: 'Vehicles',
        price: 58000,
        condition: 'Like New' as const,
        locality: 'Near College Road, Hinjilicut',
        description: 'Clean insurance till 2028. Only 6,200 KM driven in Hinjilicut. Mileage 55km/l.',
        img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
      }
    ];

    const pick = samples[Math.floor(Math.random() * samples.length)];

    const newListing: Listing = {
      id: 'list-' + Date.now(),
      title: pick.title,
      description: pick.description,
      price: pick.price,
      categoryId: pick.category as any,
      categoryName: pick.categoryName,
      condition: pick.condition,
      locality: pick.locality,
      district: 'Ganjam',
      distanceKm: 0.8,
      images: [pick.img],
      seller: {
        id: 'usr-hinjili-001',
        arokaId: '@aroka_subham',
        displayName: 'Subham Pattnaik',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
        rating: 4.95,
      },
      createdAt: 'Just now',
      status: 'active',
      isFeatured: false,
    };

    onSubmitListing(newListing);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = title.trim() || 'OnePlus 11R 5G (Pre-owned)';
    const finalPrice = parseFloat(price) || 24000;

    const newListing: Listing = {
      id: 'list-' + Date.now(),
      title: finalTitle,
      description: description.trim() || 'Verified genuine local item in Hinjilicut, Ganjam.',
      price: finalPrice,
      categoryId: category as any,
      categoryName: categoryName,
      condition,
      locality,
      district: 'Ganjam',
      distanceKm: 0.8,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'
      ],
      seller: {
        id: 'usr-hinjili-001',
        arokaId: '@aroka_subham',
        displayName: 'Subham Pattnaik',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
        rating: 4.95,
      },
      createdAt: 'Just now',
      status: 'active',
      isFeatured: false,
    };

    onSubmitListing(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-4">
          <span className="text-[10px] font-bold uppercase text-emerald-600 tracking-wider">Aroka Bazar</span>
          <h2 className="text-xl font-bold text-slate-900">Post a Local Listing</h2>
          <p className="text-xs text-slate-500">Reach buyers in Hinjilicut & Ganjam without publishing your phone number.</p>
        </div>

        {/* 1-Click Instant Post Without Details Option */}
        <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div>
            <span className="text-xs font-bold text-emerald-950 block">Fast-Track Mode</span>
            <span className="text-[11px] text-emerald-700 block">Complete and post automatically without typing details.</span>
          </div>
          <button
            type="button"
            onClick={handleQuickPostWithoutDetails}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 whitespace-nowrap"
          >
            <span>⚡ Complete Without Details</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Item Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. OnePlus 11R 5G 128GB Mint Condition"
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={e => {
                  setCategory(e.target.value);
                  const names: Record<string, string> = {
                    mobiles: 'Mobiles',
                    vehicles: 'Vehicles',
                    'real-estate': 'Real Estate',
                    furniture: 'Handloom & Craft',
                    services: 'Local Services',
                  };
                  setCategoryName(names[e.target.value] || 'Other');
                }}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
              >
                <option value="mobiles">Mobiles & Tech</option>
                <option value="vehicles">Vehicles</option>
                <option value="real-estate">Real Estate</option>
                <option value="furniture">Handloom & Crafts</option>
                <option value="services">Local Services</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Price in INR (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="24999"
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Condition</label>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Locality in Hinjilicut</label>
              <input
                type="text"
                value={locality}
                onChange={e => setLocality(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe accessories included, age, reason for sale..."
              className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleQuickPostWithoutDetails}
              className="w-full sm:w-auto px-4 py-2 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors"
            >
              ⚡ Complete Without Details
            </button>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Publish Listing
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
