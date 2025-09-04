# 🎫 EventX Studio

A comprehensive event management platform built with modern web technologies. EventX Studio enables seamless event creation, ticket booking, and real-time notifications for both organizers and attendees.

![EventX Studio](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.18-green)

## 🌟 Features

- **Event Management**: Create, publish, and manage events with admin dashboard
- **Smart Booking**: Interactive seat selection with QR code tickets
- **Real-time Notifications**: Live updates via Socket.IO
- **User Authentication**: Secure JWT-based authentication with role management
- **Analytics Dashboard**: Revenue tracking and event insights
- **Email Integration**: Automated booking confirmations
- **Mobile Responsive**: Optimized for all devices

## 🚀 Live Demo

- **Frontend**: [https://majestic-gaufre-96f16a.netlify.app](https://majestic-gaufre-96f16a.netlify.app)
- **Backend API**: [https://eventx-backend-jdpt.onrender.com](https://eventx-backend-jdpt.onrender.com)

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **Nodemailer** - Email service

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Material-UI** - Component library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## 📦 Installation

### Prerequisites
- Node.js (>=18.0.0)
- MongoDB (local or Atlas)
- Git

### Backend Setup
```bash
# Navigate to backend
cd eventx-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configurations

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend
cd eventx-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```bash
NODE_ENV=development
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:8080/api/v1
VITE_SOCKET_URL=http://localhost:8080
```

## 📚 API Documentation

The API follows RESTful conventions with the following main endpoints:

- **Authentication**: `/api/v1/auth/*`
- **Events**: `/api/v1/events/*`
- **Tickets**: `/api/v1/tickets/*`
- **Notifications**: `/api/v1/notifications/*`
- **Analytics**: `/api/v1/analytics/*`

For detailed API documentation, visit: [API Reference](./API_REFERENCE.md)

## 🗂️ Project Structure

```
eventx-project/
├── eventx-backend/          # Backend API
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth & validation
│   │   └── utils/          # Helper functions
│   └── package.json
│
└── eventx-frontend/        # Frontend Application
    ├── src/
    │   ├── components/     # React components
    │   ├── services/       # API services
    │   └── assets/         # Static files
    └── package.json
```

## 🧪 Testing

```bash
# Backend testing
cd eventx-backend
npm test

# Frontend testing
cd eventx-frontend
npm test
```

## 🚢 Deployment

The application is deployed using:
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas

For detailed deployment instructions, see: [Deployment Guide](./DEPLOYMENT_GUIDE.md)

## 📖 Documentation

- [Complete Project Report](./COMPLETE_PROJECT_REPORT.md) - Comprehensive technical documentation
- [API Reference](./API_REFERENCE.md) - Detailed API documentation




