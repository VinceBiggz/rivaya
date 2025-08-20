export interface Event {
  id: string;
  groupId: string;
  title: string;
  description?: string;
  type: EventType;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  timezone: string;
  location?: EventLocation;
  isAllDay: boolean;
  isRecurring: boolean;
  recurrenceRule?: string;
  maxAttendees?: number;
  isPublic: boolean;
  requiresRSVP: boolean;
  status: EventStatus;
  createdBy: string;
  metadata: EventMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export type EventType = 'meeting' | 'gathering' | 'celebration' | 'workshop' | 'trip' | 'fundraiser' | 'other';
export type EventCategory = 'family' | 'business' | 'social' | 'educational' | 'religious' | 'sports' | 'cultural' | 'other';
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed' | 'postponed';

export interface EventLocation {
  type: 'physical' | 'virtual' | 'hybrid';
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    coordinates?: [number, number];
  };
  virtualMeeting?: {
    platform: string;
    url: string;
    meetingId?: string;
    password?: string;
  };
  venue?: {
    name: string;
    description?: string;
    capacity?: number;
    amenities?: string[];
  };
}

export interface EventMetadata {
  tags: string[];
  customFields: Record<string, any>;
  attachments: EventAttachment[];
  budget?: {
    estimatedCost: number;
    currency: string;
    costPerPerson?: number;
    isShared: boolean;
  };
  statistics: {
    totalInvites: number;
    confirmedAttendees: number;
    declinedAttendees: number;
    pendingResponses: number;
    maybeResponses: number;
  };
}

export interface EventAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface EventRSVP {
  id: string;
  eventId: string;
  userId: string;
  status: RSVPStatus;
  responseDate: Date;
  notes?: string;
  plusOnes: number;
  dietaryRestrictions?: string[];
  accessibilityNeeds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type RSVPStatus = 'confirmed' | 'declined' | 'maybe' | 'pending' | 'no_show';

export interface EventInvitation {
  id: string;
  eventId: string;
  email: string;
  invitedBy: string;
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced';
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  createdAt: Date;
}

export interface MeetingMinutes {
  id: string;
  eventId: string;
  title: string;
  content: string;
  attendees: string[];
  absentees: string[];
  agenda: MeetingAgendaItem[];
  decisions: MeetingDecision[];
  actionItems: MeetingActionItem[];
  attachments: MeetingAttachment[];
  isDraft: boolean;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface MeetingAgendaItem {
  id: string;
  title: string;
  description?: string;
  duration?: number; // in minutes
  presenter?: string;
  isCompleted: boolean;
  notes?: string;
}

export interface MeetingDecision {
  id: string;
  title: string;
  description: string;
  decision: string;
  rationale?: string;
  votedBy: string[];
  opposedBy: string[];
  abstainedBy: string[];
  createdAt: Date;
}

export interface MeetingActionItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  completedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MeetingAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface EventReminder {
  id: string;
  eventId: string;
  userId: string;
  type: 'email' | 'push' | 'sms' | 'whatsapp';
  sendAt: Date;
  isSent: boolean;
  sentAt?: Date;
  createdAt: Date;
}
