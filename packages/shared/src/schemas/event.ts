import { z } from 'zod';

// Event Creation Schema
export const eventCreationSchema = z.object({
  groupId: z.string().uuid('Invalid group ID'),
  title: z.string().min(1, 'Event title is required').max(200, 'Event title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  type: z.enum(['meeting', 'gathering', 'celebration', 'workshop', 'trip', 'fundraiser', 'other']),
  category: z.enum(['family', 'business', 'social', 'educational', 'religious', 'sports', 'cultural', 'other']),
  startDate: z.date(),
  endDate: z.date(),
  timezone: z.string().default('UTC'),
  location: z.object({
    type: z.enum(['physical', 'virtual', 'hybrid']),
    address: z.object({
      street: z.string().min(1, 'Street address is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      postalCode: z.string().min(1, 'Postal code is required'),
      country: z.string().min(1, 'Country is required'),
      coordinates: z.tuple([z.number(), z.number()]).optional()
    }).optional(),
    virtualMeeting: z.object({
      platform: z.string().min(1, 'Platform is required'),
      url: z.string().url('Invalid meeting URL'),
      meetingId: z.string().optional(),
      password: z.string().optional()
    }).optional(),
    venue: z.object({
      name: z.string().min(1, 'Venue name is required'),
      description: z.string().optional(),
      capacity: z.number().positive().optional(),
      amenities: z.array(z.string()).optional()
    }).optional()
  }).optional(),
  isAllDay: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurrenceRule: z.string().optional(),
  maxAttendees: z.number().positive().optional(),
  isPublic: z.boolean().default(false),
  requiresRSVP: z.boolean().default(true),
  budget: z.object({
    estimatedCost: z.number().min(0, 'Estimated cost must be non-negative'),
    currency: z.string().min(3, 'Currency code is required').max(3, 'Currency code must be 3 characters'),
    costPerPerson: z.number().min(0).optional(),
    isShared: z.boolean().default(false)
  }).optional(),
  tags: z.array(z.string().max(50)).max(10).optional()
}).refine(data => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate']
});

// Event Update Schema
export const eventUpdateSchema = eventCreationSchema.partial();

// Event RSVP Schema
export const eventRSVPSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  status: z.enum(['confirmed', 'declined', 'maybe', 'pending']),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
  plusOnes: z.number().min(0, 'Plus ones must be non-negative').max(10, 'Maximum 10 plus ones allowed').default(0),
  dietaryRestrictions: z.array(z.string().max(100)).optional(),
  accessibilityNeeds: z.array(z.string().max(100)).optional()
});

// Meeting Minutes Schema
export const meetingMinutesSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  title: z.string().min(1, 'Minutes title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  attendees: z.array(z.string().uuid('Invalid user ID')).min(1, 'At least one attendee is required'),
  absentees: z.array(z.string().uuid('Invalid user ID')).optional(),
  agenda: z.array(z.object({
    title: z.string().min(1, 'Agenda item title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().max(500).optional(),
    duration: z.number().positive().optional(),
    presenter: z.string().uuid('Invalid user ID').optional(),
    isCompleted: z.boolean().default(false),
    notes: z.string().max(500).optional()
  })).optional(),
  decisions: z.array(z.object({
    title: z.string().min(1, 'Decision title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().min(1, 'Decision description is required'),
    decision: z.string().min(1, 'Decision text is required'),
    rationale: z.string().max(500).optional(),
    votedBy: z.array(z.string().uuid('Invalid user ID')).optional(),
    opposedBy: z.array(z.string().uuid('Invalid user ID')).optional(),
    abstainedBy: z.array(z.string().uuid('Invalid user ID')).optional()
  })).optional(),
  actionItems: z.array(z.object({
    title: z.string().min(1, 'Action item title is required').max(200, 'Title must be less than 200 characters'),
    description: z.string().min(1, 'Action item description is required'),
    assignedTo: z.string().uuid('Invalid user ID'),
    dueDate: z.date().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    notes: z.string().max(500).optional()
  })).optional(),
  isDraft: z.boolean().default(true),
  isPublic: z.boolean().default(false)
});

// Event Reminder Schema
export const eventReminderSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  userId: z.string().uuid('Invalid user ID'),
  type: z.enum(['email', 'push', 'sms', 'whatsapp']),
  sendAt: z.date()
});

// Export types
export type EventCreation = z.infer<typeof eventCreationSchema>;
export type EventUpdate = z.infer<typeof eventUpdateSchema>;
export type EventRSVP = z.infer<typeof eventRSVPSchema>;
export type MeetingMinutes = z.infer<typeof meetingMinutesSchema>;
export type EventReminder = z.infer<typeof eventReminderSchema>;
