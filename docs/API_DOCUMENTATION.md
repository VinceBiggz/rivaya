# RIVAYA API Documentation

## Overview

The RIVAYA API is a RESTful service built with NestJS that provides comprehensive group management functionality. All endpoints are versioned and require authentication unless specified otherwise.

## Base URL

- **Development**: `http://localhost:3001/api/v1`
- **Staging**: `https://api-staging.rivaya.com/api/v1`
- **Production**: `https://api.rivaya.com/api/v1`

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Authentication Endpoints

#### POST /auth/signup
Register a new user account.

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### POST /auth/signin
Sign in with email and password.

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

#### POST /auth/refresh
Refresh the access token using a refresh token.

```json
{
  "refreshToken": "your-refresh-token"
}
```

#### POST /auth/signout
Sign out and invalidate the current session.

## Error Format

All API errors follow a consistent format:

```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/v1/groups",
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

## Groups

### GET /groups
Get all groups the user is a member of.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `type` (string): Filter by group type (family, alumni, sacco, friends)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Family Group",
      "description": "Our family group",
      "type": "family",
      "logoUrl": "https://example.com/logo.jpg",
      "memberCount": 15,
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### POST /groups
Create a new group.

**Request Body:**
```json
{
  "name": "New Group",
  "description": "Group description",
  "type": "family",
  "logoUrl": "https://example.com/logo.jpg"
}
```

### GET /groups/:id
Get a specific group by ID.

### PUT /groups/:id
Update a group (admin only).

### DELETE /groups/:id
Delete a group (admin only).

## Group Members

### GET /groups/:id/members
Get all members of a group.

### POST /groups/:id/members
Add a member to a group (admin only).

```json
{
  "email": "member@example.com",
  "role": "member"
}
```

### PUT /groups/:id/members/:memberId
Update member role (admin only).

```json
{
  "role": "treasurer"
}
```

### DELETE /groups/:id/members/:memberId
Remove member from group (admin only).

## Contributions

### GET /groups/:id/contributions
Get all contributions for a group.

### POST /groups/:id/contributions
Create a new contribution.

```json
{
  "tierId": "uuid",
  "amount": 100.00,
  "dueDate": "2024-02-01"
}
```

### GET /contributions/my
Get user's own contributions.

### PUT /contributions/:id
Update contribution status.

## Payments

### POST /payments
Process a payment.

```json
{
  "contributionId": "uuid",
  "amount": 100.00,
  "paymentMethod": "stripe",
  "metadata": {
    "stripePaymentIntentId": "pi_1234567890"
  }
}
```

### GET /payments/:id
Get payment details.

### GET /payments
Get payment history.

## Events

### GET /groups/:id/events
Get all events for a group.

### POST /groups/:id/events
Create a new event.

```json
{
  "title": "Annual Meeting",
  "description": "Our annual group meeting",
  "eventDate": "2024-03-15T18:00:00.000Z",
  "endDate": "2024-03-15T20:00:00.000Z",
  "location": "Community Center",
  "maxAttendees": 50
}
```

### GET /events/:id
Get event details.

### PUT /events/:id
Update event (creator or admin only).

### DELETE /events/:id
Delete event (creator or admin only).

## Event RSVPs

### POST /events/:id/rsvp
RSVP to an event.

```json
{
  "status": "confirmed",
  "guestsCount": 2,
  "notes": "Will bring dessert"
}
```

### GET /events/:id/rsvps
Get all RSVPs for an event.

### PUT /events/:id/rsvp
Update RSVP.

## Minutes

### GET /groups/:id/minutes
Get all minutes for a group.

### POST /groups/:id/minutes
Create meeting minutes (secretary only).

```json
{
  "title": "January Meeting Minutes",
  "content": "Meeting discussion points...",
  "attendees": ["uuid1", "uuid2"],
  "decisions": ["Decision 1", "Decision 2"],
  "actionItems": ["Action 1", "Action 2"]
}
```

### GET /minutes/:id
Get minutes details.

### PUT /minutes/:id
Update minutes (secretary only).

## Media

### POST /media/upload
Upload a media file.

**Form Data:**
- `file`: The file to upload
- `groupId`: Group ID
- `mediaType`: image, video, document, audio

### GET /groups/:id/media
Get all media for a group.

### DELETE /media/:id
Delete media (uploader or admin only).

## Rate Limiting

The API implements rate limiting:
- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Webhooks

### POST /webhooks/payments
Payment gateway webhook endpoint.

**Supported gateways:**
- Stripe
- M-Pesa
- PayPal

## Versioning

API versioning is handled through the URL path. Current version is `v1`.

## SDKs

Official SDKs are available for:
- [JavaScript/TypeScript](https://github.com/VinceBiggz/rivaya-sdk-js)
- [React Native](https://github.com/VinceBiggz/rivaya-sdk-react-native)

## Support

For API support:
- **Documentation**: [docs.rivaya.com/api](https://docs.rivaya.com/api)
- **Issues**: [GitHub Issues](https://github.com/VinceBiggz/rivaya/issues)
- **Email**: api-support@rivaya.com
