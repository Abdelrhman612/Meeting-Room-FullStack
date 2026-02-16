# Video Meeting Application

A full-stack video conferencing application built with ASP.NET Core 8 and React, featuring real-time communication using WebRTC and SignalR.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password hashing with BCrypt
- User registration and login

### Video Conferencing
- Real-time video/audio calls using WebRTC
- Room-based meetings with unique room codes
- Screen sharing capabilities
- Mute/unmute audio
- Toggle video on/off
- Participant list with online status

### Room Management
- Create meeting rooms with custom names
- Join rooms using unique room codes
- Host privileges for room creators
- Track participants in each room

### User Features
- User profiles with role-based views
- Dashboard with meeting statistics
- Responsive design for all devices
- Profile management

### Technical Features
- Real-time communication via SignalR
- WebRTC peer-to-peer connections
- SQL Server database with Entity Framework Core
- Docker containerization
- RESTful API design
- TypeScript for type safety

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 8
- **Database**: SQL Server 2022
- **ORM**: Entity Framework Core 8
- **Authentication**: JWT Bearer
- **Real-time**: SignalR
- **Password Hashing**: BCrypt.Net-Next
- **API Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Real-time**: SignalR Client
- **Routing**: React Router v7
- **Icons**: Lucide React

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for frontend)
- **Database**: SQL Server container

## 📋 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (if running without Docker)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MeetingProject
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Connection
DEFAULT_CONNECTION=Server=database;Database=MeetingDb;User Id=sa;Password=YourStrong@Password123;TrustServerCertificate=True;MultipleActiveResultSets=true
SA_PASSWORD=YourStrong@Password123

# JWT Configuration
JWT_KEY=your-super-secret-jwt-key-with-at-least-32-characters
JWT_ISSUER=MeetingApp
JWT_AUDIENCE=MeetingAppClient
JWT_LIFETIME=7

# Frontend
PORT=3000
VITE_API_URL=http://localhost:4000
VITE_SIGNALR_URL=http://localhost:4000/meetingHub
```

### 3. Run with Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Access the application
Frontend: http://localhost:4001
Backend API: http://localhost:4000
Database: localhost:1344
```

### 4. Run Without Docker

#### Backend Setup
```bash
cd backend

# Update connection string in appsettings.json for local SQL Server
# Restore dependencies
dotnet restore

# Apply database migrations
dotnet ef database update

# Run the backend
dotnet run
# API will be available at http://localhost:4000
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file (copy from root .env)
# Run development server
npm run dev
# Frontend will be available at http://localhost:3000
```

## 📁 Project Structure

```
MeetingProject/
├── backend/                 # ASP.NET Core Backend
│   ├── Controllers/        # API Controllers
│   │   ├── Auth/           # Authentication endpoints
│   │   ├── Room/           # Room management
│   │   └── User/           # User management
│   ├── DataBase/           # Database context and models
│   ├── Dto/                # Data Transfer Objects
│   ├── Hubs/               # SignalR hubs
│   ├── InterFaces/         # Repository and service interfaces
│   ├── Migrations/         # EF Core migrations
│   ├── Repositories/       # Data access layer
│   ├── Services/           # Business logic layer
│   └── Utils/              # Utilities (JWT, etc.)
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/       # Login/Register components
│   │   │   ├── layout/     # Layout components
│   │   │   └── meeting/    # Meeting components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utilities
│   └── public/             # Static assets
│
├── docker-compose.yml      # Docker services configuration
└── .env                    # Environment variables
```

## 🔌 API Endpoints

### Authentication
- `POST /api/Auth/SignUp` - Register new user
- `POST /api/Auth/SignIn` - Login user
- `GET /api/Auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create user (Admin only)
- `PATCH /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (Admin only)

### Rooms
- `POST /api/rooms` - Create meeting room
- `GET /api/rooms/{code}` - Get room by code

### Room Users
- `POST /api/RoomUser/join` - Join a room
- `POST /api/RoomUser/leave` - Leave a room
- `GET /api/RoomUser/{roomId}/users` - Get room participants

### SignalR Hub
- `/meetingHub` - WebRTC signaling

## 💻 Usage Guide

### 1. Registration & Login
1. Navigate to `/register` to create an account
2. Use email and password to sign up
3. Login at `/login` with your credentials

### 2. Creating a Meeting
1. From the dashboard, click "Create Room"
2. Enter a room name
3. Share the generated room code with participants

### 3. Joining a Meeting
1. Click "Join Room" from dashboard
2. Enter the room code provided by host
3. Grant camera and microphone permissions when prompted

### 4. During the Meeting
- **Mute/Unmute**: Toggle audio
- **Video On/Off**: Toggle camera
- **Copy Code**: Share room code with others
- **Leave Meeting**: Exit the room

## 🔒 Security Features

- JWT tokens with expiration
- Password hashing with BCrypt
- Role-based authorization
- CORS configuration for frontend
- SQL injection prevention via EF Core
- Secure WebRTC connections

## 🐳 Docker Configuration

The application is containerized with three services:

- **backend**: ASP.NET Core API (port 4000)
- **frontend**: React app served by Nginx (port 4001)
- **database**: SQL Server 2022 (port 1344)

## 🧪 Development

### Running Migrations
```bash
cd backend
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Building Frontend for Production
```bash
cd frontend
npm run build
```

## 📝 Environment Variables

### Backend (.env)
- `DefaultConnection` - SQL Server connection string
- `SA_PASSWORD` - SQL Server SA password
- `Jwt__Key` - JWT signing key (min 32 chars)
- `Jwt__Issuer` - JWT issuer
- `Jwt__Audience` - JWT audience
- `Jwt__Lifetime` - Token lifetime in days

### Frontend (Vite)
- `PORT` - Development server port
- `VITE_API_URL` - Backend API URL
- `VITE_SIGNALR_URL` - SignalR hub URL

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request