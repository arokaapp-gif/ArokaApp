import React, { useState } from 'react';
import { 
  AppNavView, 
  UserProfile, 
  Listing, 
  CompanionBooking, 
  LedgerTransaction, 
  Conversation,
  ChatMessage,
  Post
} from './types';
import { 
  CURRENT_USER, 
  INITIAL_POSTS, 
  INITIAL_CLIPS,
  INITIAL_MOMENTS,
  INITIAL_LISTINGS, 
  INITIAL_COMPANIONS, 
  INITIAL_SPARK_PROFILES, 
  INITIAL_CONVERSATIONS, 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_LEDGER 
} from './data/mockData';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeVibeView } from './components/HomeVibeView';
import { BazarView } from './components/BazarView';
import { CompanionsView } from './components/CompanionsView';
import { SparkView } from './components/SparkView';
import { ConnectChatView } from './components/ConnectChatView';
import { WalletView } from './components/WalletView';
import { AiAssistantView } from './components/AiAssistantView';
import { VoiceCareView } from './components/VoiceCareView';
import { TelegramBotView } from './components/TelegramBotView';
import { AdminPortalView } from './components/AdminPortalView';
import { AuthModal } from './components/AuthModal';
import { CreateListingModal } from './components/CreateListingModal';
import { ServicesHubModal } from './components/ServicesHubModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppNavView>('home-vibe');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(CURRENT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isHubModalOpen, setIsHubModalOpen] = useState(false);

  // Core App States
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [walletBalance, setWalletBalance] = useState<number>(3420.00);
  const [transactions, setTransactions] = useState<LedgerTransaction[]>(INITIAL_LEDGER);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeChatMessages, setActiveChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);

  // Global Escape key handler to close all modals / overlays ("All Skip")
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAuthModalOpen(false);
        setIsCreateListingOpen(false);
        setIsHubModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1,
        };
      }
      return p;
    }));
  };

  // Deal Room handler: When user clicks "Deal Room" on a Bazar listing
  const handleOpenDealRoom = (listing: Listing) => {
    const existingConv = conversations.find(c => c.listingContext?.listingId === listing.id);
    if (existingConv) {
      setCurrentView('connect');
      return;
    }

    const dealRoomId = 'deal-' + listing.id;
    const newConv: Conversation = {
      id: dealRoomId,
      participant: {
        id: listing.seller.id,
        displayName: listing.seller.displayName,
        arokaId: '@' + listing.seller.displayName.toLowerCase().replace(/\s+/g, '_'),
        avatarUrl: listing.seller.avatarUrl,
        isOnline: true,
      },
      lastMessage: {
        text: `Interested in "${listing.title}" (Asking: ₹${listing.price})`,
        timestamp: 'Just now',
        unread: false,
      },
      type: 'deal_room',
      listingContext: {
        listingId: listing.id,
        title: listing.title,
        price: listing.price,
        thumbnail: listing.images[0],
      },
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveChatMessages(prev => ({
      ...prev,
      [dealRoomId]: [
        {
          id: 'msg-init-' + Date.now(),
          senderId: 'system',
          senderName: 'Aroka Deal Room',
          content: `Protected Deal Room initiated for "${listing.title}". Phone numbers are kept hidden for safety. Confirm condition and meetup locally in Hinjilicut.`,
          timestamp: 'Just now',
          status: 'read',
        }
      ]
    }));

    setCurrentView('connect');
  };

  // Send message in Connect / Deal Room
  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: currentUser?.id || 'usr-hinjili-001',
      senderName: currentUser?.displayName || 'Subham Pattnaik',
      content: text,
      timestamp: 'Just now',
      status: 'sent',
    };

    setActiveChatMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    // Update conversation last message snippet
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: {
            text,
            timestamp: 'Just now',
            unread: false,
          }
        };
      }
      return c;
    }));
  };

  // Book a Companion session
  const handleBookCompanionSession = (booking: CompanionBooking) => {
    // Record in ledger
    const newTxn: LedgerTransaction = {
      id: 'txn-' + Date.now(),
      ref: 'TXN-AROKA-' + Math.floor(10000 + Math.random() * 90000),
      date: 'Today, Just now',
      type: 'Companion Escrow Deposit',
      debit: booking.totalAmount,
      credit: 0,
      balanceAfter: walletBalance - booking.totalAmount,
      status: 'settled',
      description: `Escrow hold for ${booking.companionName} (${booking.category})`,
    };

    setWalletBalance(prev => prev - booking.totalAmount);
    setTransactions(prev => [newTxn, ...prev]);
  };

  // Wallet Deposit
  const handleDeposit = (amount: number) => {
    const newTxn: LedgerTransaction = {
      id: 'txn-' + Date.now(),
      ref: 'TXN-AROKA-' + Math.floor(10000 + Math.random() * 90000),
      date: 'Today, Just now',
      type: 'UPI Topup Inflow',
      debit: 0,
      credit: amount,
      balanceAfter: walletBalance + amount,
      status: 'settled',
      description: 'Instant UPI load via Indian Payment Gateway',
    };
    setWalletBalance(prev => prev + amount);
    setTransactions(prev => [newTxn, ...prev]);
  };

  // Wallet Withdraw
  const handleWithdraw = (amount: number) => {
    const newTxn: LedgerTransaction = {
      id: 'txn-' + Date.now(),
      ref: 'TXN-AROKA-' + Math.floor(10000 + Math.random() * 90000),
      date: 'Today, Just now',
      type: 'IMPS/NEFT Payout',
      debit: amount,
      credit: 0,
      balanceAfter: walletBalance - amount,
      status: 'settled',
      description: 'Bank transfer to verified savings account in Hinjilicut',
    };
    setWalletBalance(prev => prev - amount);
    setTransactions(prev => [newTxn, ...prev]);
  };

  // Add new Listing
  const handleAddListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900 pb-20 md:pb-6">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHub={() => setIsHubModalOpen(true)}
        walletBalance={walletBalance}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {(currentView === 'home' || currentView === 'home-vibe') && (
          <HomeVibeView
            posts={posts}
            clips={INITIAL_CLIPS}
            moments={INITIAL_MOMENTS}
            onNavigate={setCurrentView}
            onOpenCreate={() => setIsCreateListingOpen(true)}
            onLikePost={handleLikePost}
            onOpenHub={() => setIsHubModalOpen(true)}
          />
        )}

        {currentView === 'bazar' && (
          <BazarView
            listings={listings}
            onOpenDealRoom={handleOpenDealRoom}
            onOpenCreate={() => setIsCreateListingOpen(true)}
          />
        )}

        {currentView === 'companions' && (
          <CompanionsView
            companions={INITIAL_COMPANIONS}
            onBookSession={handleBookCompanionSession}
          />
        )}

        {currentView === 'spark' && (
          <SparkView
            profiles={INITIAL_SPARK_PROFILES}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'connect' && (
          <ConnectChatView
            conversations={conversations}
            activeChatMessages={activeChatMessages}
            onSendMessage={handleSendMessage}
          />
        )}

        {(currentView === 'wallet' || currentView === 'profile') && (
          <WalletView
            balance={walletBalance}
            transactions={transactions}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
          />
        )}

        {currentView === 'ai-assistant' && (
          <AiAssistantView onNavigate={setCurrentView} />
        )}

        {currentView === 'voice-care' && (
          <VoiceCareView />
        )}

        {(currentView === 'telegram-bot' || currentView === 'telegram') && (
          <TelegramBotView />
        )}

        {(currentView === 'admin-portal' || currentView === 'admin') && (
          <AdminPortalView onExitAdmin={() => setCurrentView('home-vibe')} />
        )}
      </main>

      {/* Bottom Navigation for Mobile & Fast Switching */}
      <BottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenCreate={() => setIsCreateListingOpen(true)}
        onOpenHub={() => setIsHubModalOpen(true)}
        unreadChatCount={1}
      />

      {/* All Services Ecosystem Directory Modal (बाकी सब यहाँ मिलेगा) */}
      <ServicesHubModal
        isOpen={isHubModalOpen}
        onClose={() => setIsHubModalOpen(false)}
        onNavigate={setCurrentView}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={user => setCurrentUser(user)}
      />

      <CreateListingModal
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        onSubmitListing={handleAddListing}
      />
    </div>
  );
}
