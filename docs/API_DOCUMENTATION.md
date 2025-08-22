# RIVAYA API Documentation

## 🚀 Overview

The RIVAYA API is a RESTful service built with NestJS that provides comprehensive group management functionality. This documentation covers all available endpoints, authentication, and usage examples.

**Base URL**: `http://localhost:3001/api/v1`

## 🔐 Authentication

### JWT Authentication
All protected endpoints require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Authentication Flow
1. **Login**: `POST /auth/login` - Get JWT token
2. **Register**: `POST /auth/register` - Create account and get token
3. **Refresh**: `POST /auth/refresh` - Refresh expired token
4. **Logout**: `POST /auth/logout` - Invalidate token

## 📋 API Endpoints

### Health Check
```http
GET /health
```

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2024-12-19T10:30:00Z",
  "service": "rivaya-api",
  "version": "1.0.0"
}
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user"
    },
    "tokens": {
      "accessToken": "jwt-token",
      "refreshToken": "refresh-token"
    }
  }
}
```

#### Register
```http
POST /auth/register
```

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user"
    },
    "tokens": {
      "accessToken": "jwt-token",
      "refreshToken": "refresh-token"
    }
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
```

**Request Body**:
```json
{
  "refreshToken": "refresh-token"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accessToken": "new-jwt-token",
    "refreshToken": "new-refresh-token"
  }
}
```

#### Logout
```http
POST /auth/logout
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### User Management Endpoints

#### Get Current User Profile
```http
GET /users/profile
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "user",
    "profilePicture": "https://example.com/avatar.jpg",
    "createdAt": "2024-12-19T10:30:00Z",
    "updatedAt": "2024-12-19T10:30:00Z"
  }
}
```

#### Update User Profile
```http
PUT /users/profile
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "fullName": "John Smith",
  "profilePicture": "https://example.com/new-avatar.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Smith",
    "profilePicture": "https://example.com/new-avatar.jpg",
    "updatedAt": "2024-12-19T10:35:00Z"
  }
}
```

#### Change Password
```http
PUT /users/password
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

### Group Management Endpoints

#### Create Group
```http
POST /groups
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "name": "Family Group",
  "description": "Our family group for staying connected",
  "category": "family",
  "privacy": "private",
  "coverImage": "https://example.com/cover.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Family Group",
    "description": "Our family group for staying connected",
    "category": "family",
    "privacy": "private",
    "coverImage": "https://example.com/cover.jpg",
    "ownerId": "user-uuid",
    "memberCount": 1,
    "createdAt": "2024-12-19T10:30:00Z",
    "updatedAt": "2024-12-19T10:30:00Z"
  }
}
```

#### Get User Groups
```http
GET /groups
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `privacy`: Filter by privacy setting

**Response**:
```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": "uuid",
        "name": "Family Group",
        "description": "Our family group",
        "category": "family",
        "privacy": "private",
        "coverImage": "https://example.com/cover.jpg",
        "memberCount": 5,
        "role": "owner",
        "createdAt": "2024-12-19T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### Get Group Details
```http
GET /groups/{groupId}
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Family Group",
    "description": "Our family group for staying connected",
    "category": "family",
    "privacy": "private",
    "coverImage": "https://example.com/cover.jpg",
    "owner": {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "members": [
      {
        "id": "uuid",
        "fullName": "John Doe",
        "email": "john@example.com",
        "role": "owner",
        "joinedAt": "2024-12-19T10:30:00Z"
      }
    ],
    "memberCount": 1,
    "createdAt": "2024-12-19T10:30:00Z",
    "updatedAt": "2024-12-19T10:30:00Z"
  }
}
```

#### Update Group
```http
PUT /groups/{groupId}
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "name": "Updated Family Group",
  "description": "Updated description",
  "privacy": "public"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Family Group",
    "description": "Updated description",
    "privacy": "public",
    "updatedAt": "2024-12-19T10:35:00Z"
  }
}
```

#### Delete Group
```http
DELETE /groups/{groupId}
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "success": true,
  "message": "Group deleted successfully"
}
```

### Member Management Endpoints

#### Invite Member
```http
POST /groups/{groupId}/members
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "email": "newmember@example.com",
  "role": "member"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "invitationId": "uuid",
    "email": "newmember@example.com",
    "role": "member",
    "invitedBy": "user-uuid",
    "invitedAt": "2024-12-19T10:30:00Z",
    "status": "pending"
  }
}
```

#### Get Group Members
```http
GET /groups/{groupId}/members
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `role`: Filter by role

**Response**:
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "uuid",
        "fullName": "John Doe",
        "email": "john@example.com",
        "role": "owner",
        "joinedAt": "2024-12-19T10:30:00Z",
        "profilePicture": "https://example.com/avatar.jpg"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### Update Member Role
```http
PUT /groups/{groupId}/members/{memberId}
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "role": "moderator"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "role": "moderator",
    "updatedAt": "2024-12-19T10:35:00Z"
  }
}
```

#### Remove Member
```http
DELETE /groups/{groupId}/members/{memberId}
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Response**:
```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

### Payment Endpoints (Planned)

#### Create Payment
```http
POST /payments
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "groupId": "uuid",
  "amount": 100.00,
  "currency": "USD",
  "description": "Monthly contribution",
  "paymentMethod": "stripe"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "groupId": "uuid",
    "payerId": "user-uuid",
    "amount": 100.00,
    "currency": "USD",
    "description": "Monthly contribution",
    "status": "pending",
    "paymentIntent": "pi_xxx",
    "createdAt": "2024-12-19T10:30:00Z"
  }
}
```

#### Get Group Payments
```http
GET /groups/{groupId}/payments
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by payment status
- `startDate`: Filter from date
- `endDate`: Filter to date

**Response**:
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "uuid",
        "payer": {
          "id": "uuid",
          "fullName": "John Doe"
        },
        "amount": 100.00,
        "currency": "USD",
        "description": "Monthly contribution",
        "status": "completed",
        "createdAt": "2024-12-19T10:30:00Z"
      }
    ],
    "summary": {
      "totalAmount": 100.00,
      "totalPayments": 1,
      "pendingAmount": 0.00
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

### Event Endpoints (Planned)

#### Create Event
```http
POST /events
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "groupId": "uuid",
  "title": "Family Reunion",
  "description": "Annual family reunion",
  "location": "Central Park",
  "startDate": "2025-06-15T14:00:00Z",
  "endDate": "2025-06-15T18:00:00Z",
  "maxAttendees": 50
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "groupId": "uuid",
    "title": "Family Reunion",
    "description": "Annual family reunion",
    "location": "Central Park",
    "startDate": "2025-06-15T14:00:00Z",
    "endDate": "2025-06-15T18:00:00Z",
    "maxAttendees": 50,
    "attendeeCount": 0,
    "createdBy": "user-uuid",
    "createdAt": "2024-12-19T10:30:00Z"
  }
}
```

#### RSVP to Event
```http
POST /events/{eventId}/rsvp
```

**Headers**:
```http
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "status": "attending",
  "guests": 2
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "eventId": "uuid",
    "userId": "user-uuid",
    "status": "attending",
    "guests": 2,
    "rsvpAt": "2024-12-19T10:30:00Z"
  }
}
```

## 🔧 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Invalid or missing authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Request validation failed
- `CONFLICT`: Resource conflict
- `INTERNAL_ERROR`: Server error

## 📊 Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **General API endpoints**: 100 requests per minute
- **File upload endpoints**: 10 requests per minute

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 🔒 Security

### CORS Configuration
- **Allowed Origins**: Configured for development and production
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: Content-Type, Authorization
- **Credentials**: Supported

### Security Headers
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Strict-Transport-Security**: max-age=31536000; includeSubDomains

## 📝 SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @rivaya/api-client
```

```typescript
import { RivayaClient } from '@rivaya/api-client';

const client = new RivayaClient({
  baseUrl: 'http://localhost:3001/api/v1',
  token: 'your-jwt-token'
});

// Get user profile
const profile = await client.users.getProfile();

// Create group
const group = await client.groups.create({
  name: 'My Group',
  description: 'Group description'
});
```

### React Hook
```typescript
import { useRivaya } from '@rivaya/react-hooks';

function MyComponent() {
  const { user, groups, createGroup } = useRivaya();

  const handleCreateGroup = async () => {
    await createGroup({
      name: 'New Group',
      description: 'Description'
    });
  };

  return (
    <div>
      <h1>Welcome, {user?.fullName}</h1>
      <button onClick={handleCreateGroup}>Create Group</button>
    </div>
  );
}
```

## 🧪 Testing

### Test Environment
- **Base URL**: `http://localhost:3001/api/v1`
- **Test Database**: Separate test database
- **Mock Services**: External services mocked

### Example Test
```typescript
import { RivayaClient } from '@rivaya/api-client';

describe('Group API', () => {
  let client: RivayaClient;

  beforeEach(() => {
    client = new RivayaClient({
      baseUrl: 'http://localhost:3001/api/v1',
      token: 'test-token'
    });
  });

  it('should create a group', async () => {
    const group = await client.groups.create({
      name: 'Test Group',
      description: 'Test Description'
    });

    expect(group.name).toBe('Test Group');
    expect(group.description).toBe('Test Description');
  });
});
```

## 📚 Additional Resources

- [Authentication Guide](./AUTHENTICATION.md)
- [Webhook Documentation](./WEBHOOKS.md)
- [Error Codes Reference](./ERROR_CODES.md)
- [SDK Documentation](./SDK_DOCUMENTATION.md)

---

**API Version**: v1.0.0
**Last Updated**: December 2024
**Contact**: api@rivaya.com
