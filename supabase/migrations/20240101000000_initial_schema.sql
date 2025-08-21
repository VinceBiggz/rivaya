-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('member', 'treasurer', 'secretary', 'admin');
CREATE TYPE contribution_status AS ENUM ('pending', 'paid', 'overdue', 'cancelled');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE media_type AS ENUM ('image', 'video', 'document', 'audio');

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  date_of_birth DATE,
  address TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create groups table
CREATE TABLE groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'family', 'alumni', 'sacco', 'friends'
  logo_url TEXT,
  banner_url TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create group_members table
CREATE TABLE group_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role user_role DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(group_id, profile_id)
);

-- Create contribution_tiers table
CREATE TABLE contribution_tiers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  frequency TEXT DEFAULT 'monthly', -- 'monthly', 'quarterly', 'yearly', 'one-time'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create households table
CREATE TABLE households (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  contact_person UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create member_contributions table
CREATE TABLE member_contributions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  member_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES contribution_tiers(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  status contribution_status DEFAULT 'pending',
  due_date DATE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contribution_id UUID REFERENCES member_contributions(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL, -- 'stripe', 'mpesa', 'paypal', 'cash'
  transaction_id TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  metadata JSONB DEFAULT '{}',
  processed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  status event_status DEFAULT 'upcoming',
  max_attendees INTEGER,
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_rsvps table
CREATE TABLE event_rsvps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'declined', 'maybe'
  guests_count INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, profile_id)
);

-- Create minutes table
CREATE TABLE minutes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  attendees JSONB DEFAULT '[]',
  decisions JSONB DEFAULT '[]',
  action_items JSONB DEFAULT '[]',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_assets table
CREATE TABLE media_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  media_type media_type NOT NULL,
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_profile_id ON group_members(profile_id);
CREATE INDEX idx_contributions_group_id ON member_contributions(group_id);
CREATE INDEX idx_contributions_member_id ON member_contributions(member_id);
CREATE INDEX idx_contributions_status ON member_contributions(status);
CREATE INDEX idx_payments_contribution_id ON payments(contribution_id);
CREATE INDEX idx_events_group_id ON events(group_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_rsvps_event_id ON event_rsvps(event_id);
CREATE INDEX idx_minutes_group_id ON minutes(group_id);
CREATE INDEX idx_media_group_id ON media_assets(group_id);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE minutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tenant isolation and role-based access

-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Groups: Members can view groups they belong to
CREATE POLICY "Members can view their groups" ON groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = groups.id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Group admins can manage groups" ON groups
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = groups.id AND profile_id = auth.uid() AND role = 'admin'
    )
  );

-- Group members: Members can view other members in their groups
CREATE POLICY "Members can view group members" ON group_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      WHERE gm.group_id = group_members.group_id AND gm.profile_id = auth.uid()
    )
  );

-- Contributions: Members can view contributions in their groups
CREATE POLICY "Members can view contributions" ON member_contributions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = member_contributions.group_id AND profile_id = auth.uid()
    )
  );

-- Payments: Only treasurers can manage payments
CREATE POLICY "Treasurers can manage payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM group_members gm
      JOIN member_contributions mc ON gm.group_id = mc.group_id
      WHERE mc.id = payments.contribution_id AND gm.profile_id = auth.uid() AND gm.role = 'treasurer'
    )
  );

-- Minutes: Only secretaries can manage minutes
CREATE POLICY "Secretaries can manage minutes" ON minutes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = minutes.group_id AND profile_id = auth.uid() AND role = 'secretary'
    )
  );

-- Events: Members can view and manage events in their groups
CREATE POLICY "Members can view events" ON events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = events.group_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "Members can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = events.group_id AND profile_id = auth.uid() AND role IN ('admin', 'secretary')
    )
  );

-- Media assets: Members can view media in their groups
CREATE POLICY "Members can view media" ON media_assets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = media_assets.group_id AND profile_id = auth.uid()
    )
  );

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', false, 52428800, ARRAY['image/*', 'video/*', 'application/pdf', 'audio/*']);

-- Storage policies for media bucket
CREATE POLICY "Members can upload media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'media' AND
    EXISTS (
      SELECT 1 FROM group_members gm
      JOIN media_assets ma ON gm.group_id = ma.group_id
      WHERE ma.file_path = storage.objects.name AND gm.profile_id = auth.uid()
    )
  );

CREATE POLICY "Members can view media" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'media' AND
    EXISTS (
      SELECT 1 FROM group_members gm
      JOIN media_assets ma ON gm.group_id = ma.group_id
      WHERE ma.file_path = storage.objects.name AND gm.profile_id = auth.uid()
    )
  );

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contribution_tiers_updated_at BEFORE UPDATE ON contribution_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_households_updated_at BEFORE UPDATE ON households
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON member_contributions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rsvps_updated_at BEFORE UPDATE ON event_rsvps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_minutes_updated_at BEFORE UPDATE ON minutes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
