-- Seed data for RIVAYA database
-- Demo users
INSERT INTO users (id, email, full_name, password_hash, role) VALUES
('user_1', 'admin@rivaya.com', 'Admin User', '$2b$10$demo.hash.admin', 'admin'),
('user_2', 'user@rivaya.com', 'Regular User', '$2b$10$demo.hash.user', 'user'),
('user_3', 'demo@rivaya.com', 'Demo User', '$2b$10$demo.hash.demo', 'user');

-- Demo groups
INSERT INTO groups (id, name, description, category, privacy, owner_id) VALUES
('group_1', 'Family Group', 'Our family group for staying connected', 'family', 'private', 'user_1'),
('group_2', 'Alumni Association', 'University alumni group', 'alumni', 'public', 'user_2'),
('group_3', 'SACCO Group', 'Savings and credit cooperative', 'sacco', 'private', 'user_3');

-- Demo group members
INSERT INTO group_members (id, group_id, user_id, role) VALUES
('member_1', 'group_1', 'user_1', 'owner'),
('member_2', 'group_1', 'user_2', 'member'),
('member_3', 'group_2', 'user_2', 'owner'),
('member_4', 'group_2', 'user_3', 'member'),
('member_5', 'group_3', 'user_3', 'owner');

-- Demo messages
INSERT INTO messages (id, group_id, sender_id, content, message_type) VALUES
('msg_1', 'group_1', 'user_1', 'Welcome to our family group!', 'text'),
('msg_2', 'group_1', 'user_2', 'Thanks for creating this group!', 'text'),
('msg_3', 'group_2', 'user_2', 'Alumni meeting next week', 'text');

