# 💬 Chatify

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-22.13.0-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-8.19.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.io-Real--time-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<p align="center">
  <strong>A modern, real-time messaging application with end-to-end encryption</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api-documentation">API</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 📖 Project Description

**Chatify** is a full-stack, real-time messaging application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io. It features a modern, responsive UI with glassmorphism design, real-time messaging capabilities, user authentication, online status tracking, and media sharing. The application is designed to provide a seamless communication experience across all devices.

## ✨ Features

### 🔐 Authentication & Security

- **User Registration & Login** with email validation
- **JWT-based Authentication** with HTTP-only cookies
- **Password Hashing** using bcrypt (10 salt rounds)
- **Protected Routes** with middleware authentication
- **Session Management** with automatic token refresh

### 💬 Real-time Messaging

- **Instant Message Delivery** using Socket.io
- **Online/Offline Status** indicators
- **Typing Indicators** (ready for implementation)
- **Message Read Receipts** (ready for implementation)
- **Real-time Notifications** with sound effects

### 📱 User Interface

- **Modern Glassmorphism Design** with purple/violet gradients
- **Fully Responsive** - Mobile, Tablet, and Desktop optimized
- **Dark Theme** with elegant color palette
- **Smooth Animations** and transitions
- **Keyboard Shortcuts** support (ESC to close chat)
- **Sound Toggle** for notification sounds

### 🖼️ Media & File Sharing

- **Profile Picture Upload** with Cloudinary integration
- **Image Compression** before upload
- **Base64 Image Support**
- **Avatar Display** with fallback images

### 👥 Contact Management

- **User Discovery** - Find and connect with users
- **Chat History** - View past conversations
- **Contact List** - Manage your connections
- **User Profiles** - View user information

### 🎨 UI/UX Features

- **Quick Message Starters** for new conversations
- **Chat Placeholders** with helpful suggestions
- **Loading States** with skeleton screens
- **Error Handling** with user-friendly messages
- **Toast Notifications** for feedback

## 🛠️ Tech Stack

### Frontend

| Technology          | Version | Purpose                     |
| ------------------- | ------- | --------------------------- |
| **React**           | 18.3.1  | UI Framework                |
| **Vite**            | 7.1.10  | Build Tool & Dev Server     |
| **Tailwind CSS**    | 3.4.17  | Utility-first CSS Framework |
| **Zustand**         | 5.0.2   | State Management            |
| **React Router**    | 7.1.1   | Client-side Routing         |
| **Axios**           | 1.7.9   | HTTP Client                 |
| **Lucide React**    | 0.469.0 | Icon Library                |
| **React Hot Toast** | 2.4.1   | Toast Notifications         |

### Backend

| Technology        | Version | Purpose                       |
| ----------------- | ------- | ----------------------------- |
| **Node.js**       | 22.13.0 | JavaScript Runtime            |
| **Express.js**    | 5.1.0   | Web Framework                 |
| **MongoDB**       | 8.19.1  | Database (via Mongoose)       |
| **Socket.io**     | 4.8.1   | Real-time Communication       |
| **JWT**           | 9.0.2   | Authentication Tokens         |
| **Bcrypt.js**     | 3.0.2   | Password Hashing              |
| **Cloudinary**    | 2.5.1   | Image Upload & Storage        |
| **Dotenv**        | 17.2.3  | Environment Variables         |
| **Cookie Parser** | 1.4.7   | Cookie Handling               |
| **CORS**          | 2.8.5   | Cross-Origin Resource Sharing |

## 🏗️ Architecture

### Project Structure

```
chatify/
├── client/                      # Frontend React Application
│   ├── public/
│   │   └── sounds/             # Audio files for notifications
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── ActiveTabSwitch.jsx
│   │   │   ├── BorderAnimatedContainer.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatsList.jsx
│   │   │   ├── ContactList.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── MessagesLoadingSkeleton.jsx
│   │   │   ├── NoChatHistoryPLaceholder.jsx
│   │   │   ├── NoChatsFound.jsx
│   │   │   ├── NoConversationPlaceholder.jsx
│   │   │   ├── PageLoader.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   └── UsersLoadingSkeleton.jsx
│   │   ├── hooks/              # Custom React Hooks
│   │   │   └── useKeyboardSound.js
│   │   ├── lib/                # Utilities & Configurations
│   │   │   └── apiInstance.js
│   │   ├── pages/              # Page Components
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── store/              # Zustand State Management
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   ├── App.jsx             # Root Component
│   │   ├── main.jsx            # Entry Point
│   │   └── index.css           # Global Styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                      # Backend Node.js Application
│   ├── src/
│   │   ├── controllers/        # Request Handlers
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/             # Email Services
│   │   │   ├── email.handlers.js
│   │   │   └── emailTemplate.js
│   │   ├── lib/                # Utilities & Configurations
│   │   │   ├── arcjet.lib.js
│   │   │   ├── cloudinary.lib.js
│   │   │   ├── db.lib.js
│   │   │   ├── env.lib.js
│   │   │   ├── resend.lib.js
│   │   │   ├── socket.js
│   │   │   └── utils.lib.js
│   │   ├── middlewares/        # Express Middlewares
│   │   │   ├── arcjet.middleware.js
│   │   │   ├── auth.middleware.js
│   │   │   └── socket.auth.middleware.js
│   │   ├── models/             # Mongoose Schemas
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/             # API Routes
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── app.js              # Express App Entry Point
│   └── package.json
│
├── .gitignore
├── package.json                 # Root Package Configuration
└── README.md
```

### Data Flow Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Client    │ ←────→  │   Express   │ ←────→  │   MongoDB   │
│   (React)   │   HTTP  │   Server    │  Mongo  │  Database   │
└─────────────┘         └─────────────┘         └─────────────┘
       ↑                       ↑                        ↑
       │                       │                        │
       │    WebSocket (Socket.io)                      │
       │                       │                        │
       └───────────────────────┘                        │
                                                        │
┌─────────────┐                               ┌─────────────┐
│  Cloudinary │ ←─────────────────────────────│   Images    │
│   (CDN)     │        Image Upload           │   Storage   │
└─────────────┘                               └─────────────┘
```

### State Management Flow

```
┌──────────────────────────────────────────────────────┐
│                   Zustand Stores                     │
├──────────────────────────────────────────────────────┤
│                                                      │
│  useAuthStore                 useChatStore          │
│  ├── authUser                ├── messages           │
│  ├── isLoggingIn             ├── selectedUser       │
│  ├── isSigningUp             ├── activeTab          │
│  ├── onlineUsers             ├── isSoundEnabled     │
│  ├── login()                 ├── getMessages()      │
│  ├── signup()                ├── sendMessage()      │
│  ├── logout()                ├── subscribeToMessages() │
│  └── updateProfile()         └── toggleSound()      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v22.13.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v10.9.2 or higher) - Comes with Node.js
- **MongoDB** (v8.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/downloads)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gauravsingh1281/Chatify.git
cd chatify
```

### 2. Install Dependencies

#### Install Root Dependencies

```bash
npm install
```

#### Install Client Dependencies

```bash
npm install --prefix client
```

#### Install Server Dependencies

```bash
npm install --prefix server
```

### 3. Environment Configuration

#### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chatify
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatify

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration (Optional - for welcome emails)
RESEND_API_KEY=your_resend_api_key

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173

# Arcjet Configuration (Optional - for rate limiting)
ARCJET_KEY=your_arcjet_key
```

#### Client Environment Variables

Create a `.env` file in the `client` directory (if needed):

```env
VITE_API_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service:

   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

## 💻 Usage

### Development Mode

#### Start the entire application (recommended):

```bash
npm run dev
```

This will concurrently run:

- Backend server on `http://localhost:3000`
- Frontend dev server on `http://localhost:5173`

#### Or start them separately:

**Terminal 1 - Start Backend Server:**

```bash
npm run start --prefix server
# or
cd server && npm start
```

**Terminal 2 - Start Frontend Dev Server:**

```bash
npm run dev --prefix client
# or
cd client && npm run dev
```

### Production Build

#### Build the Client:

```bash
npm run build
```

This will:

1. Install client dependencies
2. Build the React app to `client/dist`

#### Start Production Server:

```bash
NODE_ENV=production npm run start
```

The server will serve the built React app from `client/dist`.

## 🌐 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register New User

```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "default_avatar_url"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "avatar_url"
}
```

#### Logout

```http
POST /api/auth/logout

Response: 200 OK
{
  "message": "User logged out successfully"
}
```

#### Check Authentication

```http
GET /api/auth/check
Authorization: Cookie (token)

Response: 200 OK
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "avatar_url"
}
```

#### Update Profile Picture

```http
PUT /api/auth/update-profile
Content-Type: application/json
Authorization: Cookie (token)

{
  "profilePic": "base64_encoded_image_string"
}

Response: 200 OK
{
  "_id": "user_id",
  "fullName": "John Doe",
  "email": "john@example.com",
  "profilePic": "cloudinary_url"
}
```

### Message Endpoints

#### Get Users (for sidebar)

```http
GET /api/messages/users
Authorization: Cookie (token)

Response: 200 OK
[
  {
    "_id": "user_id",
    "fullName": "Jane Smith",
    "profilePic": "avatar_url"
  },
  ...
]
```

#### Get Messages with Specific User

```http
GET /api/messages/:userId
Authorization: Cookie (token)

Response: 200 OK
[
  {
    "_id": "message_id",
    "senderId": "sender_user_id",
    "receiverId": "receiver_user_id",
    "text": "Hello!",
    "image": "image_url",
    "createdAt": "2025-10-27T10:30:00.000Z"
  },
  ...
]
```

#### Send Message

```http
POST /api/messages/send/:userId
Content-Type: application/json
Authorization: Cookie (token)

{
  "text": "Hello there!",
  "image": "base64_image_string" // optional
}

Response: 201 Created
{
  "_id": "message_id",
  "senderId": "sender_user_id",
  "receiverId": "receiver_user_id",
  "text": "Hello there!",
  "image": "cloudinary_url",
  "createdAt": "2025-10-27T10:30:00.000Z"
}
```

### WebSocket Events (Socket.io)

#### Client → Server Events

```javascript
// Get online users
socket.emit("getOnlineUsers");

// Send message (handled via HTTP POST, but triggers socket event)
```

#### Server → Client Events

```javascript
// Receive list of online users
socket.on("getOnlineUsers", (userIds) => {
  console.log("Online users:", userIds);
});

// Receive new message
socket.on("newMessage", (message) => {
  console.log("New message:", message);
});
```

## 🎨 Color Palette

The application uses a modern purple/violet gradient theme:

| Color              | Hex                     | Usage                        |
| ------------------ | ----------------------- | ---------------------------- |
| **Primary Violet** | `#8B5CF6` (violet-500)  | Primary actions, buttons     |
| **Primary Purple** | `#A855F7` (purple-500)  | Secondary accents            |
| **Dark Purple**    | `#581C87` (purple-900)  | Backgrounds                  |
| **Emerald**        | `#10B981` (emerald-500) | Online status                |
| **White**          | `#FFFFFF`               | Text, borders (with opacity) |

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: HTTP-only cookies to prevent XSS attacks
- **Input Validation**: Email format and password length validation
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data stored in .env files
- **Error Handling**: Generic error messages to prevent information leakage

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test
```

## 📦 Deployment

### Deploy to Render (Recommended)

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**

   - Connect your GitHub repository
   - Set the root directory to `server`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

3. **Set Environment Variables** on Render dashboard

4. **Deploy** - Render will automatically build and deploy

### Deploy Client to Vercel/Netlify

1. **Build the client:**

   ```bash
   npm run build --prefix client
   ```

2. **Deploy the `client/dist` folder** to Vercel or Netlify

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Coding Standards

- Use ESLint for code linting
- Follow React best practices
- Write clean, readable code with comments
- Test your changes before submitting

## 📝 License

This project is licensed under the **ISC License**.

## 👨‍💻 Author

**Gaurav Pratap Singh**

- GitHub: [@gauravsingh1281](https://github.com/gauravsingh1281)

## 🙏 Acknowledgments

- React team for the amazing framework
- Socket.io for real-time capabilities
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- MongoDB for the flexible database
- All open-source contributors

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/gauravsingh1281/Chatify/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

## 🗺️ Roadmap

- [ ] Video/Audio calling
- [ ] Message reactions
- [ ] Typing indicators
- [ ] Message read receipts
- [ ] Group chats
- [ ] File sharing (documents, videos)
- [ ] Message search functionality
- [ ] Dark/Light theme toggle
- [ ] Message encryption
- [ ] Push notifications
- [ ] Mobile app (React Native)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/gauravsingh1281">Gaurav Pratap Singh</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
