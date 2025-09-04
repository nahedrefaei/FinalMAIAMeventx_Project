# EventX API Reference

## Base URL
- **Production**: `https://eventx-backend-jdpt.onrender.com/api/v1`
- **Development**: `http://localhost:8080/api/v1`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2025-09-04T10:00:00.000Z"
}
```

## Error Responses
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Validation error",
    "details": {}
  },
  "timestamp": "2025-09-04T10:00:00.000Z"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "age": 25,
  "gender": "male",
  "location": "New York",
  "interests": ["music", "technology"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64f...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Events

#### GET /events
Get all events with optional filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (draft, published, closed)
- `search` (string): Search in title and description

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### POST /events
Create a new event (Admin only).

**Request Body:**
```json
{
  "title": "Tech Conference 2025",
  "description": "Annual technology conference",
  "date": "2025-12-15T09:00:00.000Z",
  "venue": "Convention Center",
  "price": 150,
  "totalSeats": 500
}
```

### Tickets

#### POST /tickets/book
Book tickets for an event.

**Request Body:**
```json
{
  "eventId": "64f...",
  "seats": ["A1", "A2", "A3"],
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "_id": "64f...",
        "ticketNumber": "TKT-123456",
        "seatNumber": "A1",
        "qrCode": "data:image/png;base64,..."
      }
    ],
    "totalAmount": 450
  }
}
```

### Notifications

#### GET /notifications
Get user notifications.

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `unreadOnly` (boolean): Only unread notifications

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "_id": "64f...",
        "type": "booking_made",
        "title": "Booking Confirmed",
        "message": "Your booking for Tech Conference 2025 has been confirmed",
        "isRead": false,
        "priority": "high",
        "createdAt": "2025-09-04T10:00:00.000Z"
      }
    ],
    "unreadCount": 3
  }
}
```

## Rate Limiting
- **General**: 1000 requests per 15 minutes per IP
- **Authentication**: 5 requests per minute per IP
- **Booking**: 10 requests per minute per user

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Webhooks
Socket.IO events for real-time updates:
- `new_notification` - New notification received
- `event_updated` - Event details changed
- `booking_confirmed` - Ticket booking confirmed
- `seat_availability_changed` - Seat status updated

## SDK Examples

### JavaScript/Node.js
```javascript
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://eventx-backend-jdpt.onrender.com/api/v1',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// Get events
const events = await api.get('/events');

// Book tickets
const booking = await api.post('/tickets/book', {
  eventId: 'event_id',
  seats: ['A1', 'A2']
});
```

### Python
```python
import requests

headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

# Get events
response = requests.get(
    'https://eventx-backend-jdpt.onrender.com/api/v1/events',
    headers=headers
)
```

## Testing
Use the included Postman collection for comprehensive API testing:
```bash
# Import collection
EventX.postman_collection.json
```
