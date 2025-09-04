# EventX Studio - Complete Project Documentation


##  Project Overview

**EventX Studio** is a comprehensive event management platform that enables users to create, manage, and attend events. The platform provides real-time notifications, ticket booking with QR codes, analytics dashboard, and complete event lifecycle management.

### Key Features
- **Event Management**: Create, edit, publish, and manage events
- **Ticket Booking**: Seat selection and QR code generation
- **Real-time Notifications**: Socket.IO powered live updates
- **User Management**: Role-based access (Admin/User)
- **Analytics Dashboard**: Event statistics and insights
- **QR Code Check-in**: Digital ticket validation
- **Email Notifications**: Automated email confirmations
- **Responsive Design**: Mobile-first approach

---

##  Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│   - Vite        │    │   - Express     │    │   - Atlas       │
│   - Material-UI │    │   - Socket.IO   │    │                 │
│   - Tailwind    │    │   - JWT Auth    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Deployment    │    │   Services      │
│   - Netlify     │    │   - Email       │
│   - Render      │    │   - QR Code     │
│                 │    │   - File Upload │
└─────────────────┘    └─────────────────┘
```

### Folder Structure
```
eventx-project/
├── eventx-backend/                 # Backend API
│   ├── src/
│   │   ├── config/                # Database configuration
│   │   ├── controllers/           # Business logic
│   │   ├── middleware/            # Auth & error handling
│   │   ├── models/               # Database schemas
│   │   ├── routes/               # API endpoints
│   │   ├── services/             # External services
│   │   ├── utils/                # Utility functions
│   │   ├── docs/                 # API documentation
│   │   └── seed/                 # Database seeding
│   ├── package.json
│   └── .env
│
└── eventx-frontend/               # Frontend Application
    ├── src/
    │   ├── components/           # React components
    │   │   ├── Auth/            # Authentication
    │   │   ├── DashboardScreen/ # Main dashboard
    │   │   ├── analytics/       # Analytics charts
    │   │   ├── manageEvents/    # Event management
    │   │   ├── notifications/   # Notification system
    │   │   └── usercomponents/  # User-specific UI
    │   ├── assets/              # Static files
    │   └── services/            # API services
    ├── public/
    └── package.json
```

---

## Technology Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | >=18 | Runtime environment |
| **Express.js** | ^4.19.2 | Web framework |
| **MongoDB** | ^8.18.0 | Database |
| **Mongoose** | ^8.18.0 | ODM |
| **Socket.IO** | ^4.8.1 | Real-time communication |
| **JWT** | ^9.0.2 | Authentication |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **Joi** | ^17.13.3 | Input validation |
| **Nodemailer** | ^6.9.14 | Email service |
| **QRCode** | ^1.5.4 | QR code generation |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.1.1 | UI framework |
| **Vite** | ^7.1.2 | Build tool |
| **Material-UI** | ^7.3.1 | UI components |
| **Tailwind CSS** | ^4.1.12 | Styling |
| **Axios** | ^1.11.0 | HTTP client |
| **React Router** | ^7.8.2 | Routing |
| **Socket.IO Client** | ^4.8.1 | Real-time client |
| **Recharts** | ^3.1.2 | Data visualization |

---

##  Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  birthDate: Date,
  gender: String,
  location: String,
  interests: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  date: Date (required),
  venue: String (required),
  price: Number (default: 0),
  totalSeats: Number (required, min: 1),
  seats: [{
    number: String (required),
    isBooked: Boolean (default: false)
  }],
  status: String (enum: ['draft', 'published', 'closed']),
  createdBy: ObjectId (ref: 'User'),
  popularity: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Ticket Model
```javascript
{
  _id: ObjectId,
  event: ObjectId (ref: 'Event', required),
  user: ObjectId (ref: 'User', required),
  seatNumber: String (required),
  pricePaid: Number (required),
  qrToken: String (required),
  checkedIn: Boolean (default: false),
  paymentStatus: String (enum: ['paid', 'refunded'], default: 'paid'),
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  type: String (enum: ['event_created', 'booking_made', 'upcoming_event', 'event_reminder', 'payment_received']),
  title: String (required),
  message: String (required),
  data: {
    eventId: ObjectId (ref: 'Event'),
    ticketId: ObjectId (ref: 'Ticket'),
    additionalInfo: Mixed
  },
  isRead: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high', 'urgent'], default: 'medium'),
  createdAt: Date,
  updatedAt: Date
}
```

---

##  API Endpoints

### Authentication Routes (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | User registration | Public |
| POST | `/login` | User login | Public |
| POST | `/logout` | User logout | Authenticated |
| GET | `/me` | Get current user | Authenticated |

### Event Routes (`/api/v1/events`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all events | Public |
| POST | `/` | Create event | Admin |
| GET | `/:id` | Get event by ID | Public |
| PUT | `/:id` | Update event | Admin |
| DELETE | `/:id` | Delete event | Admin |
| POST | `/:id/publish` | Publish event | Admin |

### Ticket Routes (`/api/v1/tickets`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/book` | Book tickets | Authenticated |
| GET | `/my` | Get user tickets | Authenticated |
| GET | `/:id` | Get ticket details | Owner/Admin |
| POST | `/:id/checkin` | Check-in with QR | Admin |

### Notification Routes (`/api/v1/notifications`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get notifications | Authenticated |
| PUT | `/:id/read` | Mark as read | Authenticated |
| PUT | `/mark-all-read` | Mark all as read | Authenticated |
| DELETE | `/:id` | Delete notification | Authenticated |
| GET | `/count` | Get unread count | Authenticated |
| POST | `/test` | Create test notification | Authenticated |

### Analytics Routes (`/api/v1/analytics`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/overview` | Dashboard overview | Admin |
| GET | `/events` | Event analytics | Admin |
| GET | `/users` | User analytics | Admin |
| GET | `/revenue` | Revenue analytics | Admin |

---

##  Frontend Features

### Dashboard Components
- **Analytics Dashboard**: Real-time charts and metrics
- **Event Management**: CRUD operations for events
- **User Management**: User roles and permissions
- **Notification Center**: Real-time notification system
- **Ticket Booking**: Interactive seat selection
- **Profile Management**: User profile updates

### UI Components
- **Sidebar Navigation**: Collapsible menu with icons
- **Data Tables**: Sortable and filterable tables
- **Modal Dialogs**: Create/edit forms
- **Charts**: Revenue and user analytics
- **QR Code Display**: Digital tickets
- **Responsive Design**: Mobile-optimized layouts

### Authentication Flow
1. **Registration**: Email validation and password hashing
2. **Login**: JWT token generation
3. **Protected Routes**: Role-based access control
4. **Auto-logout**: Token expiration handling

---

##  Installation & Setup

### Prerequisites
- Node.js (>=18.0.0)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup
```bash
# Clone repository
git clone <repository-url>
cd eventx-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend
cd ../eventx-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit with your backend URL

# Start development server
npm run dev
```

### Environment Setup
1. **MongoDB Atlas**: Create cluster and get connection string
2. **Email Service**: Configure SMTP settings
3. **JWT Secrets**: Generate secure secret keys
4. **CORS Origins**: Set allowed frontend URLs

---

##  Deployment Guide

### Backend Deployment (Render)
1. **Create Web Service** on Render
2. **Configuration**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js
3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<secure-secret>
   CLIENT_URL=<your-frontend-url>
   ```

### Frontend Deployment (Netlify)
1. **Connect Repository** to Netlify
2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Environment Variables**:
   ```
   VITE_API_URL=<your-backend-url>/api/v1
   VITE_SOCKET_URL=<your-backend-url>
   ```
4. **Redirects**: Add `_redirects` file for SPA routing

### Live URLs
- **Frontend**: https://majestic-gaufre-96f16a.netlify.app
- **Backend**: https://eventx-backend-jdpt.onrender.com

---

##  Environment Variables

### Backend (.env)
```bash
# Environment
NODE_ENV=production
PORT=10000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventx

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
JWT_EXPIRES_IN=7d
QR_SECRET=your-super-secure-qr-secret-minimum-32-characters
QR_EXPIRES_IN=300d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=EventX <your-email@gmail.com>

# CORS
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend (.env.local)
```bash
VITE_API_URL=https://your-backend-domain.com/api/v1
VITE_SOCKET_URL=https://your-backend-domain.com
```

---

##  Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure stateless authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-based Access**: Admin and user permissions
- **Protected Routes**: Middleware validation

### Security Middleware
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **Input Validation**: Joi schema validation

### Data Protection
- **Password Encryption**: Never store plain text
- **SQL Injection Prevention**: Mongoose ODM
- **XSS Protection**: Input sanitization
- **CSRF Protection**: SameSite cookies

---

##  Real-time Features

### Socket.IO Implementation
```javascript
// Server-side room management
io.on('connection', (socket) => {
  // User-specific room
  socket.join(`user_${userId}`);
  
  // Admin room for admins
  if (user.role === 'admin') {
    socket.join('admin_room');
  }
  
  // Event-specific rooms
  socket.on('join_event', (eventId) => {
    socket.join(`event_${eventId}`);
  });
});
```

### Real-time Features
- **Live Notifications**: Instant notification delivery
- **Event Updates**: Real-time event changes
- **Booking Status**: Live seat availability
- **Admin Alerts**: System notifications

---

##  Testing

### Backend Testing
```bash
# Test authentication
node test-auth.js

# Test backend connectivity
node test-backend.js

# Manual API testing
curl -X GET https://eventx-backend-jdpt.onrender.com
```

### Frontend Testing
```bash
# Development server
npm run dev

# Build verification
npm run build
npm run preview

# Lint checking
npm run lint
```

### Integration Testing
- **API Endpoints**: Postman collection included
- **Authentication Flow**: Login/logout testing
- **Real-time Features**: Socket.IO connection testing

---

##  Performance Optimization

### Backend Optimizations
- **Database Indexing**: Optimized queries
- **Pagination**: Limited data retrieval
- **Caching**: Redis for frequent queries
- **Compression**: Gzip middleware

### Frontend Optimizations
- **Code Splitting**: Dynamic imports
- **Lazy Loading**: Component-based loading
- **Image Optimization**: Compressed assets
- **Bundle Size**: Tree shaking enabled

### Database Optimization
```javascript
// Indexes for better performance
notificationSchema.index({ userId: 1, createdAt: -1 });
eventSchema.index({ status: 1, date: 1 });
ticketSchema.index({ user: 1, event: 1 });
```

---

##  Troubleshooting

### Common Issues

#### CORS Errors
```javascript
// Solution: Update CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL?.split(',') || true,
  credentials: true
};
```

#### Socket.IO Connection Issues
```javascript
// Frontend: Check URL configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080';
```

#### 404 on Netlify Refresh
```
// Add to public/_redirects
/*    /index.html   200
```

### Debug Commands
```bash
# Check backend health
curl https://eventx-backend-jdpt.onrender.com

# Check environment variables
console.log(process.env.NODE_ENV);

# Socket.IO debugging
localStorage.debug = 'socket.io-client:socket';
```

### Log Monitoring
- **Backend Logs**: Render dashboard
- **Frontend Errors**: Browser console
- **Database Logs**: MongoDB Atlas monitoring

---

##  API Documentation


