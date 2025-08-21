export interface Group {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  type: GroupType;
  members: GroupMember[];
  createdAt: Date;
  updatedAt: Date;
}

export type GroupType = 'family' | 'alumni' | 'sacco' | 'community' | 'business';

export interface GroupMember {
  userId: string;
  role: GroupRole;
  joinedAt: Date;
}

export type GroupRole = 'admin' | 'moderator' | 'member';
