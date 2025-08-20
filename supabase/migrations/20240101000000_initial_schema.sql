-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contribution_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE households ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_minutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_reactions ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid()::text = id);

-- User Preferences RLS Policies
CREATE POLICY "Users can view their own preferences" ON user_preferences
    FOR SELECT USING (auth.uid()::text = profile_id);

CREATE POLICY "Users can update their own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid()::text = profile_id);

CREATE POLICY "Users can insert their own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid()::text = profile_id);

-- User Sessions RLS Policies
CREATE POLICY "Users can view their own sessions" ON user_sessions
    FOR SELECT USING (auth.uid()::text = profile_id);

CREATE POLICY "Users can delete their own sessions" ON user_sessions
    FOR DELETE USING (auth.uid()::text = profile_id);

CREATE POLICY "Users can insert their own sessions" ON user_sessions
    FOR INSERT WITH CHECK (auth.uid()::text = profile_id);

-- Groups RLS Policies
CREATE POLICY "Users can view public groups" ON groups
    FOR SELECT USING (is_public = true);

CREATE POLICY "Group members can view their groups" ON groups
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = groups.id 
            AND profile_id = auth.uid()::text
            AND is_active = true
        )
    );

CREATE POLICY "Group admins can update their groups" ON groups
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM group_members 
            WHERE group_id = groups.id 
            AND profile_id = auth.uid()::text
            AND role = 'admin'
            AND is_active = true
        )
    );

CREATE POLICY "Authenticated users can create groups" ON groups
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Group Members RLS Policies
CREATE POLICY "Group members can view group members" ON group_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = group_members.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Group admins can manage members" ON group_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = group_members.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.role = 'admin'
            AND gm.is_active = true
        )
    );

CREATE POLICY "Users can view their own memberships" ON group_members
    FOR SELECT USING (profile_id = auth.uid()::text);

-- Group Invitations RLS Policies
CREATE POLICY "Users can view their own invitations" ON group_invitations
    FOR SELECT USING (profile_id = auth.uid()::text);

CREATE POLICY "Group admins can manage invitations" ON group_invitations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = group_invitations.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.role = 'admin'
            AND gm.is_active = true
        )
    );

-- Contribution Tiers RLS Policies
CREATE POLICY "Group members can view contribution tiers" ON contribution_tiers
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = contribution_tiers.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Group admins can manage contribution tiers" ON contribution_tiers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = contribution_tiers.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.role = 'admin'
            AND gm.is_active = true
        )
    );

-- Households RLS Policies
CREATE POLICY "Group members can view households" ON households
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = households.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Group admins can manage households" ON households
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = households.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.role = 'admin'
            AND gm.is_active = true
        )
    );

-- Member Contributions RLS Policies
CREATE POLICY "Users can view their own contributions" ON member_contributions
    FOR SELECT USING (profile_id = auth.uid()::text);

CREATE POLICY "Group admins can view all contributions" ON member_contributions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = member_contributions.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.role = 'admin'
            AND gm.is_active = true
        )
    );

CREATE POLICY "Users can create their own contributions" ON member_contributions
    FOR INSERT WITH CHECK (profile_id = auth.uid()::text);

-- Payments RLS Policies
CREATE POLICY "Users can view their own payments" ON payments
    FOR SELECT USING (profile_id = auth.uid()::text);

CREATE POLICY "Users can create their own payments" ON payments
    FOR INSERT WITH CHECK (profile_id = auth.uid()::text);

-- Events RLS Policies
CREATE POLICY "Group members can view events" ON events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = events.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Group admins can manage events" ON events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = events.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.role = 'admin'
            AND gm.is_active = true
        )
    );

CREATE POLICY "Event creators can manage their events" ON events
    FOR ALL USING (created_by = auth.uid()::text);

-- Event RSVPs RLS Policies
CREATE POLICY "Users can view their own RSVPs" ON event_rsvps
    FOR SELECT USING (profile_id = auth.uid()::text);

CREATE POLICY "Group members can view event RSVPs" ON event_rsvps
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            JOIN events e ON e.group_id = gm.group_id
            WHERE e.id = event_rsvps.event_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Users can manage their own RSVPs" ON event_rsvps
    FOR ALL USING (profile_id = auth.uid()::text);

-- Meeting Minutes RLS Policies
CREATE POLICY "Group members can view meeting minutes" ON meeting_minutes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            JOIN events e ON e.group_id = gm.group_id
            WHERE e.id = meeting_minutes.event_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Meeting creators can manage minutes" ON meeting_minutes
    FOR ALL USING (created_by = auth.uid()::text);

-- Media Assets RLS Policies
CREATE POLICY "Group members can view media assets" ON media_assets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = media_assets.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Users can upload media to their groups" ON media_assets
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM group_members gm
            WHERE gm.group_id = media_assets.group_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
        AND uploaded_by = auth.uid()::text
    );

CREATE POLICY "Users can update their own media" ON media_assets
    FOR UPDATE USING (uploaded_by = auth.uid()::text);

CREATE POLICY "Users can delete their own media" ON media_assets
    FOR DELETE USING (uploaded_by = auth.uid()::text);

-- Media Comments RLS Policies
CREATE POLICY "Group members can view media comments" ON media_comments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            JOIN media_assets ma ON ma.group_id = gm.group_id
            WHERE ma.id = media_comments.media_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Users can create comments" ON media_comments
    FOR INSERT WITH CHECK (profile_id = auth.uid()::text);

CREATE POLICY "Users can update their own comments" ON media_comments
    FOR UPDATE USING (profile_id = auth.uid()::text);

CREATE POLICY "Users can delete their own comments" ON media_comments
    FOR DELETE USING (profile_id = auth.uid()::text);

-- Media Reactions RLS Policies
CREATE POLICY "Group members can view media reactions" ON media_reactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM group_members gm
            JOIN media_assets ma ON ma.group_id = gm.group_id
            WHERE ma.id = media_reactions.media_id
            AND gm.profile_id = auth.uid()::text
            AND gm.is_active = true
        )
    );

CREATE POLICY "Users can create reactions" ON media_reactions
    FOR INSERT WITH CHECK (profile_id = auth.uid()::text);

CREATE POLICY "Users can update their own reactions" ON media_reactions
    FOR UPDATE USING (profile_id = auth.uid()::text);

CREATE POLICY "Users can delete their own reactions" ON media_reactions
    FOR DELETE USING (profile_id = auth.uid()::text);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_phone ON profiles(phone);
CREATE INDEX idx_group_members_group_profile ON group_members(group_id, profile_id);
CREATE INDEX idx_group_members_profile ON group_members(profile_id);
CREATE INDEX idx_events_group_date ON events(group_id, start_date);
CREATE INDEX idx_event_rsvps_event_profile ON event_rsvps(event_id, profile_id);
CREATE INDEX idx_media_assets_group ON media_assets(group_id);
CREATE INDEX idx_media_assets_uploaded_by ON media_assets(uploaded_by);
CREATE INDEX idx_payments_profile ON payments(profile_id);
CREATE INDEX idx_member_contributions_profile ON member_contributions(profile_id);
CREATE INDEX idx_member_contributions_group ON member_contributions(group_id);
