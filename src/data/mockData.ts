import {
  UserProfile,
  Post,
  Clip,
  Moment,
  Listing,
  CompanionProfile,
  SparkProfile,
  Conversation,
  ChatMessage,
  LedgerTransaction,
  SupportTicket,
  SystemHealthComponent,
  AdCampaign,
} from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'usr-hinjili-001',
  email: 'arokaapp@gmail.com',
  arokaId: '@aroka_subham',
  displayName: 'Subham Pattnaik',
  bio: 'Community builder & local craft enthusiast in Hinjilicut. Love exploring Ganjam markets!',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  city: 'Hinjilicut',
  district: 'Ganjam',
  state: 'Odisha',
  pincode: '761102',
  isIdentityVerified: true,
  role: 'owner',
  joinedDate: 'Joined January 2026',
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-101',
    author: {
      id: 'usr-102',
      arokaId: '@priya_hinjili',
      displayName: 'Priya Mahapatra',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      city: 'Hinjilicut',
    },
    content: 'Morning walk near Rushikulya river bank! Hinjilicut is looking so vibrant this morning. Setting up local handloom stalls near Main Road market today.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&auto=format&fit=crop&q=80'
    ],
    locationName: 'Rushikulya Bank, Hinjilicut',
    tags: ['Hinjilicut', 'Odisha', 'MorningVibe', 'Community'],
    likesCount: 142,
    commentsCount: 19,
    sharesCount: 8,
    isLiked: false,
    createdAt: '2 hours ago',
  },
  {
    id: 'post-102',
    author: {
      id: 'usr-103',
      arokaId: '@ganjam_techies',
      displayName: 'Rakesh Sahu',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      city: 'Berhampur (Nearby)',
    },
    content: 'Listed my OnePlus 11 5G on Aroka Bazar! Mint condition with original dash charger and box. Local pickup available in Hinjilicut or Berhampur.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    locationName: 'Court Road, Hinjilicut',
    tags: ['ArokaBazar', 'Mobiles', 'TechDeals'],
    taggedListingId: 'list-001',
    likesCount: 88,
    commentsCount: 24,
    sharesCount: 5,
    isLiked: true,
    createdAt: '4 hours ago',
  },
  {
    id: 'post-103',
    author: {
      id: 'usr-104',
      arokaId: '@anita_studies',
      displayName: 'Anita Dash',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      city: 'Hinjilicut',
    },
    content: 'Wrapped up our 2-hour Math study session via Aroka Companions! Huge thanks to Soumya for guiding calculus problem sets so clearly. Local peer study works wonders. 📚✨',
    mediaUrls: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'
    ],
    locationName: 'Science College, Hinjilicut',
    tags: ['ArokaCompanions', 'StudyBuddy', 'PeerLearning'],
    likesCount: 215,
    commentsCount: 31,
    sharesCount: 12,
    isLiked: false,
    createdAt: 'Yesterday',
  }
];

export const INITIAL_CLIPS: Clip[] = [
  {
    id: 'clip-01',
    author: {
      id: 'usr-105',
      arokaId: '@odia_tales',
      displayName: 'Debashish Panda',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    title: 'Top 5 hidden street food spots in Hinjilicut & Aska road! 🍛🔥',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-cooking-in-a-kitchen-42510-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 58,
    soundTitle: 'Original Audio - Hinjili Food Beats',
    hashtags: ['GanjamEats', 'StreetFood', 'OdiaVibes'],
    likesCount: 1420,
    commentsCount: 86,
    viewsCount: 9400,
    isLiked: false,
    createdAt: '1 day ago',
  },
  {
    id: 'clip-02',
    author: {
      id: 'usr-106',
      arokaId: '@ganjam_crafts',
      displayName: 'Meera Choudhury',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    title: 'Handloom Sambalpuri & Berhampuri silk weaving process timelapse ✨',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-spinning-a-wooden-spool-with-thread-41618-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
    durationSeconds: 74,
    soundTitle: 'Traditional Flute Melody - Odisha',
    hashtags: ['Handloom', 'OdishaCrafts', 'ArokaBazar'],
    likesCount: 2310,
    commentsCount: 140,
    viewsCount: 14800,
    isLiked: true,
    createdAt: '2 days ago',
  }
];

export const INITIAL_MOMENTS: Moment[] = [
  {
    id: 'moment-01',
    author: {
      id: 'usr-102',
      arokaId: '@priya_hinjili',
      displayName: 'Priya',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image',
    textOverlay: 'College campus meet today! ☕',
    locationSticker: 'Hinjilicut Town',
    poll: {
      question: 'Chai or Cold Coffee after class?',
      options: [
        { text: 'Chai ☕', votes: 76 },
        { text: 'Cold Coffee 🥤', votes: 42 }
      ]
    },
    expiresInHours: 18,
    createdAt: '6 hours ago',
  },
  {
    id: 'moment-02',
    author: {
      id: 'usr-103',
      arokaId: '@rakesh_s',
      displayName: 'Rakesh',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image',
    textOverlay: 'Weekend ride towards Gopalpur beach 🌊',
    locationSticker: 'Ganjam Coast',
    expiresInHours: 21,
    createdAt: '3 hours ago',
  },
  {
    id: 'moment-03',
    author: {
      id: 'usr-107',
      arokaId: '@sunil_agro',
      displayName: 'Sunil',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image',
    textOverlay: 'Fresh organic greens harvested today 🥬',
    locationSticker: 'Hinjili Agri Market',
    expiresInHours: 12,
    createdAt: '12 hours ago',
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'list-001',
    seller: {
      id: 'usr-103',
      arokaId: '@ganjam_techies',
      displayName: 'Rakesh Sahu',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      rating: 4.9,
    },
    categoryId: 'mobiles',
    categoryName: 'Mobiles & Tablets',
    title: 'OnePlus 11 5G (16GB / 256GB) Eternal Green',
    description: 'Barely 8 months old with Bill, Box, and 100W SuperVOOC charger. Screen protector and Spigen case on since day one. Battery health 98%. Pick up in Hinjilicut market.',
    price: 34500,
    condition: 'Like New',
    locality: 'Main Market Road, Hinjilicut',
    district: 'Ganjam',
    distanceKm: 1.2,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    status: 'active',
    createdAt: 'Today',
  },
  {
    id: 'list-002',
    seller: {
      id: 'usr-108',
      arokaId: '@bikers_odisha',
      displayName: 'Ashok Pradhan',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      rating: 4.8,
    },
    categoryId: 'vehicles',
    categoryName: 'Vehicles',
    title: 'Royal Enfield Classic 350 - Gunmetal Grey (2022)',
    description: 'Single owner, OD-07 registration, 14,200 km driven. Regularly serviced at authorized Berhampur showroom. All insurance and pollution papers clean.',
    price: 158000,
    condition: 'Good',
    locality: 'Near Block Office, Hinjilicut',
    district: 'Ganjam',
    distanceKm: 2.5,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    createdAt: 'Yesterday',
  },
  {
    id: 'list-003',
    seller: {
      id: 'usr-106',
      arokaId: '@meera_textiles',
      displayName: 'Meera Handlooms',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      rating: 5.0,
    },
    categoryId: 'furniture',
    categoryName: 'Home & Craft',
    title: 'Authentic Pure Silk Berhampuri Patta Saree (Phoda Kumbha)',
    description: 'Handcrafted GI-tagged Berhampuri double-pallu silk saree with temple border. Certified artisan weave with Silk Mark certification tag.',
    price: 12500,
    condition: 'Brand New',
    locality: 'Bazar Sahi, Hinjilicut',
    district: 'Ganjam',
    distanceKm: 0.8,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    status: 'active',
    createdAt: '2 days ago',
  },
  {
    id: 'list-004',
    seller: {
      id: 'usr-109',
      arokaId: '@kalinga_infra',
      displayName: 'Kalinga Realtors',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      rating: 4.7,
    },
    categoryId: 'real-estate',
    categoryName: 'Real Estate',
    title: '2BHK Independent House for Rent - 1200 Sq Ft',
    description: 'Ground floor with dedicated car parking, 24/7 borehole water, 2 bedrooms, modular kitchen, puja room. Walking distance from Science College.',
    price: 8500,
    condition: 'Good',
    locality: 'College Colony, Hinjilicut',
    district: 'Ganjam',
    distanceKm: 3.1,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    createdAt: '3 days ago',
  },
  {
    id: 'list-005',
    seller: {
      id: 'usr-110',
      arokaId: '@solar_tech_ganjam',
      displayName: 'Bikram Nayak',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      rating: 4.9,
    },
    categoryId: 'services',
    categoryName: 'Local Services',
    title: 'Rooftop Solar & Inverter Installation Services',
    description: 'Government approved subsidy guidance, rooftop survey, Luminous / Microtek inverter setup, and emergency electrical troubleshooting in Hinjilicut & Aska block.',
    price: 1500,
    condition: 'Brand New',
    locality: 'Station Road, Hinjilicut',
    district: 'Ganjam',
    distanceKm: 4.0,
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=600&auto=format&fit=crop&q=80'
    ],
    status: 'active',
    createdAt: '3 days ago',
  }
];

export const INITIAL_COMPANIONS: CompanionProfile[] = [
  {
    id: 'comp-01',
    userId: 'usr-201',
    arokaId: '@soumya_mentor',
    displayName: 'Soumya Ranjan Mohanty',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    category: 'Study Buddy',
    headline: 'IIT JEE Prep, Physics & Math Problem Solver (B.Tech NISER)',
    bio: 'Experienced student mentor helping 11th & 12th students with conceptual clarity in Physics and Advanced Calculus. Patient, structured, and exam-focused discussions.',
    languages: ['Odia', 'Hindi', 'English'],
    hourlyRate: 120,
    rating: 4.95,
    reviewCount: 42,
    sessionsCompleted: 68,
    isOnline: true,
    isKycVerified: true,
    badges: ['Top Rated Mentor', 'KYC Verified', 'Science Specialist'],
  },
  {
    id: 'comp-02',
    userId: 'usr-202',
    arokaId: '@kavita_listener',
    displayName: 'Kavita Behera',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'Heart-to-Heart / Venting',
    headline: 'Empathetic Listener for Stress, Career Doubts & Daily Venting',
    bio: 'A compassionate, non-judgmental space to talk through your everyday pressure, loneliness, or exam anxiety. (Note: Non-clinical, friendly empathetic peer support).',
    languages: ['Hindi', 'Odia', 'English'],
    hourlyRate: 100,
    rating: 5.0,
    reviewCount: 65,
    sessionsCompleted: 110,
    isOnline: true,
    isKycVerified: true,
    badges: ['Active Listener', 'KYC Verified', '50+ Sessions'],
  },
  {
    id: 'comp-03',
    userId: 'usr-203',
    arokaId: '@dilip_dada',
    displayName: 'Dilip Kumar Das',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    category: 'Elder Companion',
    headline: 'Friendly Newspaper Reading, Story Sharing & Tech Help for Seniors',
    bio: 'Patient companion helping our respected elders with smartphone usage, digital banking assistance, Odia/English news reading, and gentle evening conversations.',
    languages: ['Odia', 'Hindi'],
    hourlyRate: 90,
    rating: 4.9,
    reviewCount: 28,
    sessionsCompleted: 45,
    isOnline: false,
    isKycVerified: true,
    badges: ['Elder Care Certified', 'KYC Verified'],
  },
  {
    id: 'comp-04',
    userId: 'usr-204',
    arokaId: '@manoj_coder',
    displayName: 'Manoj Tripathy',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Skill Partner',
    headline: 'Web Development, React & JavaScript Pair Programming Partner',
    bio: 'Level up your software engineering skills. Pair coding, Git best practices, and building resume projects together step by step.',
    languages: ['English', 'Hindi', 'Odia'],
    hourlyRate: 150,
    rating: 4.88,
    reviewCount: 34,
    sessionsCompleted: 52,
    isOnline: true,
    isKycVerified: true,
    badges: ['Tech Partner', 'KYC Verified'],
  }
];

export const INITIAL_SPARK_PROFILES: SparkProfile[] = [
  {
    id: 'spark-01',
    displayName: 'Tanvi M.',
    age: 23,
    gender: 'Female',
    distanceKm: 4,
    locality: 'Hinjilicut Central',
    bio: 'Architecture graduate with a passion for heritage temples, indie acoustic playlists, and filter coffee. Looking to connect with mindful souls!',
    interests: ['Architecture', 'Acoustic Music', 'Photography', 'Chai Stalls'],
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
    ],
    verified: true,
  },
  {
    id: 'spark-02',
    displayName: 'Aditya K.',
    age: 25,
    gender: 'Male',
    distanceKm: 8,
    locality: 'Ganjam Road',
    bio: 'Software engineer by weekday, badminton player and weekend road-tripper. Love quiet cafes and long conversations about philosophy & tech.',
    interests: ['Badminton', 'Coding', 'Motorcycles', 'Philosophy'],
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80'
    ],
    verified: true,
  },
  {
    id: 'spark-03',
    displayName: 'Rashmi S.',
    age: 22,
    gender: 'Female',
    distanceKm: 12,
    locality: 'Berhampur Border',
    bio: 'Literature student & classical Odissi dancer. Exploring books, local art, and sunsets along the Rushikulya.',
    interests: ['Classical Dance', 'Books', 'Sunsets', 'Art History'],
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
    ],
    verified: true,
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-01',
    type: 'deal_room',
    participant: {
      id: 'usr-103',
      displayName: 'Rakesh Sahu',
      arokaId: '@ganjam_techies',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isOnline: true,
    },
    listingContext: {
      id: 'list-001',
      title: 'OnePlus 11 5G (16GB / 256GB)',
      price: 34500,
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80',
    },
    ephemeralOption: 'none',
    lastMessage: {
      text: 'Haan bhai, kal 5 PM Hinjilicut market square pe inspect kar sakte ho.',
      timestamp: '15m ago',
      isRead: true,
      isMine: false,
    },
    unreadCount: 1,
  },
  {
    id: 'conv-02',
    type: 'direct',
    participant: {
      id: 'usr-201',
      displayName: 'Soumya Ranjan (Companion)',
      arokaId: '@soumya_mentor',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      isOnline: true,
    },
    ephemeralOption: 'none',
    lastMessage: {
      text: 'Session confirmed for tomorrow 4 PM! Bring your Calculus doubts.',
      timestamp: '1h ago',
      isRead: true,
      isMine: false,
    },
    unreadCount: 0,
  },
  {
    id: 'conv-03',
    type: 'spark_match',
    participant: {
      id: 'spark-01',
      displayName: 'Tanvi M.',
      arokaId: '@spark_tanvi',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      isOnline: false,
    },
    ephemeralOption: '24h',
    lastMessage: {
      text: 'Hey! Loved your photo by Rushikulya bank 😊',
      timestamp: '2h ago',
      isRead: true,
      isMine: false,
    },
    unreadCount: 0,
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-01': [
    {
      id: 'msg-1',
      senderId: 'usr-hinjili-001',
      senderName: 'Subham Pattnaik',
      content: 'Hello Rakesh ji, is the OnePlus 11 still available?',
      timestamp: '4:20 PM',
    },
    {
      id: 'msg-2',
      senderId: 'usr-103',
      senderName: 'Rakesh Sahu',
      content: 'Namaste Subham! Yes it is active. Complete bill & 100W charger included.',
      timestamp: '4:22 PM',
    },
    {
      id: 'msg-3',
      senderId: 'usr-hinjili-001',
      senderName: 'Subham Pattnaik',
      content: 'Can we meet somewhere near Hinjilicut Market for physical verification?',
      timestamp: '4:25 PM',
    },
    {
      id: 'msg-4',
      senderId: 'usr-103',
      senderName: 'Rakesh Sahu',
      content: 'Haan bhai, kal 5 PM Hinjilicut market square pe inspect kar sakte ho.',
      timestamp: '4:28 PM',
    }
  ]
};

export const INITIAL_LEDGER: LedgerTransaction[] = [
  {
    id: 'ledg-001',
    ref: 'TXN-AROKA-98210',
    date: '12 Sep 2026, 04:30 PM',
    type: 'Companion Earnings',
    description: '1 Hour Study Session with Anita Dash (Order #CS-441)',
    debit: 0,
    credit: 80,
    balanceAfter: 1840,
    status: 'Settled',
  },
  {
    id: 'ledg-002',
    ref: 'TXN-AROKA-98209',
    date: '12 Sep 2026, 04:30 PM',
    type: 'Platform Commission',
    description: 'Platform 20% maintenance & trust fee (#CS-441)',
    debit: 20,
    credit: 0,
    balanceAfter: 1760,
    status: 'Settled',
  },
  {
    id: 'ledg-003',
    ref: 'TXN-AROKA-97450',
    date: '10 Sep 2026, 11:15 AM',
    type: 'Wallet Topup',
    description: 'UPI / NetBanking Topup (Ref: PAY_IN_8849)',
    debit: 0,
    credit: 1500,
    balanceAfter: 1760,
    status: 'Settled',
  },
  {
    id: 'ledg-004',
    ref: 'TXN-AROKA-96102',
    date: '08 Sep 2026, 02:00 PM',
    type: 'Bazar Boost',
    description: 'Featured 3-day local sponsored listing for Mobiles',
    debit: 250,
    credit: 0,
    balanceAfter: 260,
    status: 'Settled',
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-01',
    ticketNumber: 'AROKA-TK-8831',
    category: 'Bazar',
    priority: 'medium',
    title: 'Verification badge enquiry for local handloom shop',
    status: 'resolved',
    createdAt: '11 Sep 2026',
    lastUpdate: '12 Sep 2026',
    messagesCount: 4,
  },
  {
    id: 'tkt-02',
    ticketNumber: 'AROKA-TK-8835',
    category: 'Payment',
    priority: 'high',
    title: 'UPI transaction webhook settlement confirmation query',
    status: 'in_progress',
    createdAt: '13 Sep 2026',
    lastUpdate: '2 hours ago',
    messagesCount: 3,
  },
  {
    id: 'tkt-03',
    ticketNumber: 'AROKA-TK-8840',
    category: 'Companion',
    priority: 'low',
    title: 'Update available hours for weekend study buddy slot',
    status: 'open',
    createdAt: 'Today',
    lastUpdate: 'Just now',
    messagesCount: 1,
  }
];

export const SYSTEM_HEALTH_METRICS: SystemHealthComponent[] = [
  { name: 'API Server (Express/Node)', status: 'operational', latencyMs: 24, uptime: '99.98%', details: 'Cluster healthy on port 3000' },
  { name: 'PostgreSQL + PostGIS (v16)', status: 'operational', latencyMs: 14, uptime: '99.99%', details: 'Spatial GIST indexes cached' },
  { name: 'Supabase Auth Gateway', status: 'operational', latencyMs: 45, uptime: '100%', details: 'Email + Password provider active' },
  { name: 'Redis Cache & BullMQ Queue', status: 'operational', latencyMs: 4, uptime: '99.99%', details: 'Workers handling background jobs' },
  { name: 'S3 Storage & CDN', status: 'operational', latencyMs: 38, uptime: '99.95%', details: 'cdn.arokaapp.in edge responding' },
  { name: 'Payment Gateway (Double-Entry)', status: 'operational', latencyMs: 110, uptime: '99.92%', details: 'Webhooks signature verified & idempotent' },
  { name: 'Aroka AI Gateway (Gemini)', status: 'operational', latencyMs: 180, uptime: '99.94%', details: 'Authorized tool registry connected' },
  { name: 'Voice Care (8249892208)', status: 'operational', latencyMs: 65, uptime: '99.90%', details: 'STT / TTS Telephony pipeline live' },
  { name: 'Telegram Bot Gateway', status: 'operational', latencyMs: 85, uptime: '99.95%', details: '@ArokaAppBot webhook synchronized' },
];

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'camp-01',
    businessName: 'Maa Tarini Mobile Hub',
    name: 'Festive Smartphone Exchange Offer',
    objective: 'Bazar Local Footfall',
    dailyBudget: 350,
    radiusKm: 15,
    locality: 'Hinjilicut + Aska Road',
    status: 'active',
    impressions: 4820,
    clicks: 342,
    spent: 700,
  },
  {
    id: 'camp-02',
    businessName: 'Ganjam Silk Weavers Co-op',
    name: 'GI Certified Berhampuri Patta Handlooms',
    objective: 'Brand Awareness',
    dailyBudget: 500,
    radiusKm: 25,
    locality: 'Ganjam District Wide',
    status: 'active',
    impressions: 8910,
    clicks: 614,
    spent: 1250,
  }
];
