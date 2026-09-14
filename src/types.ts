/**
 * ArokaApp Central TypeScript Definitions
 * Connect. Trade. Vibe. Care.
 * Initial Market: Hinjilicut, Ganjam, Odisha, India
 */

export type AppNavView = 
  | 'home' 
  | 'home-vibe'
  | 'connect' 
  | 'create' 
  | 'bazar' 
  | 'profile' 
  | 'companions' 
  | 'spark' 
  | 'business' 
  | 'wallet'
  | 'ai-assistant' 
  | 'voice-care' 
  | 'telegram' 
  | 'telegram-bot'
  | 'admin' 
  | 'admin-portal'
  | 'brand' 
  | 'public-web'
  | 'docs';

export type PublicPageSlug =
  | 'home'
  | 'about'
  | 'features'
  | 'bazar'
  | 'companions'
  | 'spark'
  | 'business'
  | 'ai-assistant'
  | 'safety'
  | 'privacy'
  | 'terms'
  | 'community-guidelines'
  | 'refund-policy'
  | 'contact'
  | 'help';

export interface UserProfile {
  id: string;
  email: string;
  arokaId: string; // e.g., @aroka_priya
  displayName: string;
  bio: string;
  avatarUrl: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  contactPhone?: string; // Strictly optional, NEVER used for login
  isIdentityVerified: boolean;
  role: 'user' | 'companion' | 'business' | 'moderator' | 'admin' | 'owner';
  joinedDate: string;
}

export interface Post {
  id: string;
  author: {
    id: string;
    arokaId: string;
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
    city: string;
  };
  content: string;
  mediaUrls: string[];
  locationName: string;
  tags: string[];
  taggedListingId?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
}

export interface Clip {
  id: string;
  author: {
    id: string;
    arokaId: string;
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
  };
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationSeconds: number; // Max 90s
  soundTitle: string;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isLiked?: boolean;
  createdAt: string;
}

export interface Moment {
  id: string;
  author: {
    id: string;
    arokaId: string;
    displayName: string;
    avatarUrl: string;
  };
  mediaUrl: string;
  mediaType: 'image' | 'video';
  textOverlay?: string;
  locationSticker?: string;
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
  };
  expiresInHours: number;
  createdAt: string;
}

export interface Listing {
  id: string;
  seller: {
    id: string;
    arokaId: string;
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
    rating: number;
  };
  categoryId: 'mobiles' | 'electronics' | 'vehicles' | 'real-estate' | 'furniture' | 'services';
  categoryName: string;
  title: string;
  description: string;
  price: number;
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  locality: string;
  district: string;
  distanceKm: number;
  images: string[];
  isFeatured?: boolean;
  status: 'active' | 'under_offer' | 'sold';
  createdAt: string;
}

export interface CompanionProfile {
  id: string;
  userId: string;
  arokaId: string;
  displayName: string;
  avatarUrl: string;
  category: 'Study Buddy' | 'Skill Partner' | 'Heart-to-Heart / Venting' | 'Elder Companion' | 'Leisure Companion';
  headline: string;
  bio: string;
  languages: string[];
  hourlyRate: number; // in INR e.g., ₹100
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  isOnline: boolean;
  isKycVerified: boolean;
  badges: string[];
}

export interface CompanionBooking {
  id: string;
  companionId: string;
  companionName: string;
  clientName: string;
  category: string;
  dateTime: string;
  durationMinutes: number;
  totalAmount: number;
  platformFee: number; // e.g. 20%
  companionPayout: number; // e.g. 80%
  status: 'booked' | 'in_progress' | 'completed' | 'cancelled';
}

export interface SparkProfile {
  id: string;
  displayName: string;
  age: number;
  gender: string;
  distanceKm: number;
  locality: string;
  bio: string;
  interests: string[];
  photos: string[];
  verified: boolean;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'deal_room' | 'group' | 'spark_match';
  participant: {
    id: string;
    displayName: string;
    arokaId: string;
    avatarUrl: string;
    isOnline: boolean;
  };
  listingContext?: {
    id?: string;
    listingId?: string;
    title: string;
    price: number;
    thumbnail: string;
  };
  ephemeralOption?: 'none' | '24h' | '7d';
  lastMessage: {
    text: string;
    timestamp: string;
    isRead?: boolean;
    isMine?: boolean;
    unread?: boolean;
  };
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'voice' | 'location';
  isEphemeral?: boolean;
  isSystem?: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface LedgerTransaction {
  id: string;
  ref: string;
  date: string;
  type: 
    | 'Companion Earnings' 
    | 'Platform Commission' 
    | 'Bazar Boost' 
    | 'Withdrawal Payout' 
    | 'Wallet Topup'
    | 'Companion Escrow Deposit'
    | 'UPI Topup Inflow'
    | 'IMPS/NEFT Payout';
  description: string;
  debit: number;
  credit: number;
  balanceAfter: number;
  status: 'Settled' | 'Processing' | 'settled';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  category: 'Account' | 'Payment' | 'Bazar' | 'Companion' | 'Spark' | 'Technical' | 'Safety' | 'Report User';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  lastUpdate: string;
  messagesCount: number;
}

export interface AdminRole {
  name: 'Owner' | 'Admin' | 'Support' | 'Finance' | 'Trust & Safety' | 'Content Moderator' | 'AI Operator' | 'DevOps';
  description: string;
  permissions: string[];
}

export interface SystemHealthComponent {
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  latencyMs: number;
  uptime: string;
  details: string;
}

export interface AdCampaign {
  id: string;
  businessName: string;
  name: string;
  objective: string;
  dailyBudget: number;
  radiusKm: number;
  locality: string;
  status: 'active' | 'paused' | 'review';
  impressions: number;
  clicks: number;
  spent: number;
}
