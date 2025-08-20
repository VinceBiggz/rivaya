export interface MediaAsset {
  id: string;
  groupId: string;
  uploadedBy: string;
  type: MediaType;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  metadata: MediaMetadata;
  aiTags: AITag[];
  privacy: MediaPrivacy;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type MediaType = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other';

export interface MediaMetadata {
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for video/audio in seconds
  bitrate?: number;
  fps?: number; // for video
  codec?: string;
  colorSpace?: string;
  exif?: Record<string, any>;
  customFields?: Record<string, any>;
}

export interface AITag {
  id: string;
  tag: string;
  confidence: number;
  category: AITagCategory;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  createdAt: Date;
}

export type AITagCategory = 'person' | 'object' | 'scene' | 'text' | 'face' | 'emotion' | 'action' | 'other';

export interface MediaPrivacy {
  visibility: 'public' | 'group_members' | 'selected_members' | 'private';
  allowedMembers?: string[];
  blockedMembers?: string[];
  allowDownload: boolean;
  allowSharing: boolean;
  watermark: boolean;
  expiresAt?: Date;
}

export interface MediaAlbum {
  id: string;
  groupId: string;
  name: string;
  description?: string;
  coverImageId?: string;
  privacy: MediaPrivacy;
  assets: string[];
  tags: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaComment {
  id: string;
  assetId: string;
  userId: string;
  content: string;
  parentId?: string;
  isEdited: boolean;
  editedAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaReaction {
  id: string;
  assetId: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
}

export type ReactionType = 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry' | 'heart' | 'thumbs_up' | 'thumbs_down';

export interface MediaShare {
  id: string;
  assetId: string;
  sharedBy: string;
  sharedWith: string[];
  message?: string;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface MediaAnalytics {
  assetId: string;
  views: number;
  downloads: number;
  shares: number;
  reactions: Record<ReactionType, number>;
  comments: number;
  uniqueViewers: string[];
  viewHistory: {
    userId: string;
    viewedAt: Date;
    duration?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
