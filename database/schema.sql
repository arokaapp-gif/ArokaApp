-- ============================================================================
-- AROKAAPP PRODUCTION DATABASE SCHEMA (PostgreSQL 16 + PostGIS)
-- Database: aroka_production
-- Tagline: Connect. Trade. Vibe. Care.
-- Initial Market Focus: Hinjilicut, Ganjam District, Odisha, India (Lat: 19.4820, Lng: 84.7441)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. USERS & SUPABASE AUTH INTEGRATION (Strict Email + Password, No Phone OTP)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supabase_auth_id UUID UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'companion', 'business', 'moderator', 'admin', 'owner'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ NULL
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    aroka_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. @aroka_rahul
    display_name VARCHAR(120) NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    city VARCHAR(100) DEFAULT 'Hinjilicut',
    district VARCHAR(100) DEFAULT 'Ganjam',
    state VARCHAR(100) DEFAULT 'Odisha',
    country VARCHAR(100) DEFAULT 'India',
    pincode VARCHAR(10) DEFAULT '761102',
    -- PostGIS geography point (Longitude, Latitude)
    location GEOGRAPHY(POINT, 4326),
    -- Optional phone only for approved business/support contact, NEVER for login
    contact_phone VARCHAR(20) NULL,
    is_identity_verified BOOLEAN DEFAULT FALSE,
    badges JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_name VARCHAR(150),
    device_type VARCHAR(50), -- 'web', 'android', 'ios'
    ip_address INET,
    user_agent TEXT,
    fcm_token TEXT,
    last_active_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    verification_type VARCHAR(50) NOT NULL, -- 'aadhaar_redacted', 'pan', 'business_gst', 'student_id'
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    document_hashes TEXT[],
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. SOCIAL SYSTEM (Posts, Clips, Moments/Stories, Interactions)
-- ============================================================================

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    location_name VARCHAR(150) DEFAULT 'Hinjilicut, Odisha',
    location GEOGRAPHY(POINT, 4326),
    tags TEXT[] DEFAULT '{}',
    tagged_listing_id UUID,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    visibility VARCHAR(30) DEFAULT 'public', -- 'public', 'followers', 'local'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(30) NOT NULL, -- 'image', 'video'
    thumbnail_url TEXT,
    aspect_ratio VARCHAR(10) DEFAULT '1:1',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT max_ten_images_check CHECK (sort_order >= 0 AND sort_order < 10)
);

CREATE TABLE IF NOT EXISTS clips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    duration_seconds INT NOT NULL CHECK (duration_seconds <= 90),
    sound_title VARCHAR(150),
    hashtags TEXT[] DEFAULT '{}',
    likes_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type VARCHAR(30) NOT NULL, -- 'image', 'video'
    text_overlay TEXT,
    poll_data JSONB,
    location_sticker VARCHAR(100),
    visibility VARCHAR(30) DEFAULT 'followers', -- 'public', 'followers', 'close_friends'
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_id UUID NOT NULL,
    target_type VARCHAR(30) NOT NULL, -- 'post', 'clip', 'comment'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, target_id, target_type)
);

CREATE TABLE IF NOT EXISTS follows (
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id)
);

-- ============================================================================
-- 3. AROKA BAZAR (Local Marketplace with PostGIS Radius Discovery)
-- ============================================================================

CREATE TABLE IF NOT EXISTS listing_categories (
    id VARCHAR(50) PRIMARY KEY, -- 'mobiles', 'electronics', 'vehicles', 'real-estate', 'furniture', 'services'
    name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id VARCHAR(50) NOT NULL REFERENCES listing_categories(id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    condition VARCHAR(50) NOT NULL, -- 'new', 'like_new', 'good', 'fair'
    locality VARCHAR(100) NOT NULL DEFAULT 'Hinjilicut',
    district VARCHAR(100) NOT NULL DEFAULT 'Ganjam',
    pincode VARCHAR(10) DEFAULT '761102',
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    status VARCHAR(30) DEFAULT 'active', -- 'active', 'under_offer', 'sold', 'archived'
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS listing_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 4. REAL-TIME CHAT & BAZAR DEAL ROOMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(30) DEFAULT 'direct', -- 'direct', 'group', 'deal_room'
    listing_id UUID REFERENCES listings(id) ON DELETE SET NULL, -- Context for Deal Rooms
    created_by UUID REFERENCES users(id),
    ephemeral_duration VARCHAR(20) DEFAULT 'none', -- 'none', '24h', '7d'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversation_members (
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_muted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    content TEXT,
    media_url TEXT,
    media_type VARCHAR(30), -- 'image', 'video', 'document', 'audio', 'location'
    is_system_message BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ NULL, -- for ephemeral messages
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. AROKA COMPANIONS (Verified Study Buddy, Venting, Skill, Elder Care)
-- NOT medical care. NOT professional therapy.
-- ============================================================================

CREATE TABLE IF NOT EXISTS companion_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- 'study_buddy', 'skill_partner', 'venting_heart_to_heart', 'elder_companion', 'leisure'
    headline VARCHAR(180) NOT NULL,
    bio TEXT NOT NULL,
    languages TEXT[] DEFAULT '{"Hindi", "Odia", "English"}',
    hourly_rate_inr DECIMAL(10, 2) NOT NULL DEFAULT 100.00,
    rating DECIMAL(3, 2) DEFAULT 5.00,
    total_sessions INT DEFAULT 0,
    kyc_status VARCHAR(30) DEFAULT 'approved', -- 'pending', 'approved', 'suspended'
    is_online BOOLEAN DEFAULT TRUE,
    is_accepting_bookings BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companion_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    companion_id UUID NOT NULL REFERENCES companion_profiles(id),
    client_id UUID NOT NULL REFERENCES users(id),
    category VARCHAR(50) NOT NULL,
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    total_amount_inr DECIMAL(10, 2) NOT NULL,
    platform_commission_inr DECIMAL(10, 2) NOT NULL, -- Configurable (e.g. 20%)
    companion_payout_inr DECIMAL(10, 2) NOT NULL,    -- 80%
    status VARCHAR(30) DEFAULT 'booked', -- 'booked', 'in_progress', 'completed', 'cancelled'
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_notes TEXT,
    safety_exit_triggered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. AROKA SPARK (Opt-In Dating & Discovery, Logically Isolated)
-- ============================================================================

CREATE TABLE IF NOT EXISTS spark_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT FALSE,
    display_name VARCHAR(80) NOT NULL,
    age INT CHECK (age >= 18),
    gender VARCHAR(30),
    preferred_genders TEXT[],
    interests TEXT[],
    bio TEXT,
    photos TEXT[],
    max_distance_km INT DEFAULT 25,
    location GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS spark_likes (
    sender_id UUID NOT NULL REFERENCES spark_profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES spark_profiles(id) ON DELETE CASCADE,
    is_super_like BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (sender_id, receiver_id)
);

CREATE TABLE IF NOT EXISTS spark_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user1_id UUID NOT NULL REFERENCES spark_profiles(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES spark_profiles(id) ON DELETE CASCADE,
    conversation_id UUID UNIQUE REFERENCES conversations(id),
    matched_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_unmatched BOOLEAN DEFAULT FALSE
);

-- ============================================================================
-- 7. WALLET & DOUBLE-ENTRY FINANCIAL LEDGER (Source of Truth)
-- ============================================================================

CREATE TABLE IF NOT EXISTS wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    currency VARCHAR(10) DEFAULT 'INR',
    projected_balance DECIMAL(12, 2) DEFAULT 0.00,
    locked_balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS wallet_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_ref VARCHAR(100) UNIQUE NOT NULL,
    account_debit UUID NOT NULL,
    account_credit UUID NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    type VARCHAR(50) NOT NULL, -- 'companion_payment', 'commission_deduction', 'payout', 'deposit', 'refund'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    gateway VARCHAR(50) DEFAULT 'RAZORPAY_COMPLIANT',
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'authorized', 'captured', 'failed', 'refunded'
    gateway_payment_id TEXT,
    signature TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(120) UNIQUE NOT NULL, -- Idempotency key
    gateway VARCHAR(50) NOT NULL,
    payload JSONB NOT NULL,
    is_signature_verified BOOLEAN NOT NULL,
    processed_status VARCHAR(30) DEFAULT 'processed',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 8. AROKA AI ENGINE & VOICE GATEWAY (8249892208 & Telegram)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    channel VARCHAR(30) DEFAULT 'app', -- 'app', 'voice_8249892208', 'telegram'
    language VARCHAR(20) DEFAULT 'hinglish', -- 'hindi', 'english', 'hinglish', 'odia'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system', 'tool'
    content TEXT NOT NULL,
    tool_calls JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS voice_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    call_sid VARCHAR(100) UNIQUE NOT NULL,
    customer_phone_masked VARCHAR(20) NOT NULL,
    official_line VARCHAR(20) DEFAULT '8249892208',
    status VARCHAR(30) DEFAULT 'in_progress', -- 'in_progress', 'resolved_ai', 'escalated_human', 'ended'
    language VARCHAR(20) DEFAULT 'hinglish',
    transcript JSONB DEFAULT '[]'::jsonb,
    duration_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telegram_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    telegram_user_id BIGINT UNIQUE NOT NULL,
    telegram_username VARCHAR(100),
    verification_code VARCHAR(50),
    is_linked BOOLEAN DEFAULT FALSE,
    linked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 9. BUSINESS ADVERTISING & ANALYTICS
-- ============================================================================

CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id),
    business_name VARCHAR(150) NOT NULL,
    gstin VARCHAR(20),
    category VARCHAR(80),
    address TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    objective VARCHAR(50) DEFAULT 'local_traffic', -- 'local_traffic', 'lead_gen', 'bazar_boost'
    daily_budget_inr DECIMAL(10, 2) NOT NULL,
    target_radius_km INT DEFAULT 15,
    target_locality VARCHAR(100) DEFAULT 'Hinjilicut',
    status VARCHAR(30) DEFAULT 'active', -- 'draft', 'active', 'paused', 'completed'
    impressions INT DEFAULT 0,
    clicks INT DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 10. TRUST & SAFETY, AUDIT LOGS, SUPPORT TICKETS
-- ============================================================================

CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(30) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    category VARCHAR(50) NOT NULL, -- 'account', 'payment', 'bazar', 'companion', 'spark', 'technical', 'report_user', 'safety'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'emergency'
    status VARCHAR(30) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    assigned_agent VARCHAR(100),
    title VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS support_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL, -- 'user', 'support_agent', 'ai_assistant'
    sender_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES users(id),
    target_id UUID NOT NULL,
    target_type VARCHAR(50) NOT NULL, -- 'post', 'clip', 'listing', 'companion', 'spark_user', 'message'
    reason VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(30) DEFAULT 'pending_review', -- 'pending_review', 'resolved', 'dismissed'
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SPATIAL POSTGIS INDEXES (Speed up 2km, 5km, 15km, District Radius Discovery)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_listings_location ON listings USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_user_profiles_location ON user_profiles USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_spark_location ON spark_profiles USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_posts_location ON posts USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_companion_kyc ON companion_profiles(kyc_status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_wallet_ledger_ref ON wallet_ledger(transaction_ref);
