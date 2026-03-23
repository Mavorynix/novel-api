<div align="center">

# 📚 Novel API

**A comprehensive REST API for novel platform with authentication, RBAC, chapters, bookmarks, ratings, comments, and more**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 Features

### 🔐 Authentication & Authorization
- JWT Access & Refresh Tokens
- Role-Based Access Control (Admin, Author, User)
- Email Verification
- Password Management

### 📚 Content Management
- **Novels** - CRUD with cover upload, genres, tags
- **Chapters** - CRUD with auto-numbering, scheduled publishing
- **Genres** - Admin-only management
- **Comments** - Nested comments with threading

### 💡 Social Features
- 🔖 **Bookmarks** - Save favorite novels
- ⭐ **Ratings** - 1-5 star ratings
- ❤️ **Likes** - Like comments
- 👥 **Follows** - Follow authors
- 🔔 **Notifications** - Real-time via WebSocket

### 🛠️ Technical
- RESTful API design
- Rate limiting
- File uploads
- Swagger documentation

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/manggaladev/novel-api.git
cd novel-api

# Install
bun install

# Setup database
bun run db:push

# Run
bun run dev
```

## 📖 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | Login |
| `GET` | `/api/novels` | List novels |
| `POST` | `/api/novels` | Create novel (author) |
| `GET` | `/api/novels/:id` | Get novel |
| `GET` | `/api/novels/:id/chapters` | Get chapters |
| `POST` | `/api/novels/:id/ratings` | Rate novel |

Swagger UI available at `/api-docs`

## 🏗️ Project Structure

```
novel-api/
├── src/
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middlewares/     # Auth, validation
│   ├── utils/           # Helpers
│   └── config/          # Configuration
├── prisma/
│   └── schema.prisma    # Database schema
└── uploads/             # File uploads
```

## 🔧 Environment Variables

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=3000
```

## 🗄️ Database

Supports both **SQLite** (development) and **PostgreSQL** (production).

```bash
# SQLite (default)
bun run db:push

# PostgreSQL
DATABASE_URL="postgresql://..." bun run db:push
```

## 🤝 Contributing

Contributions welcome! See our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

[MIT License](LICENSE)

---

<div align="center">

**[⬆ Back to Top](#-novel-api)**

Made with ❤️ by [manggaladev](https://github.com/manggaladev)

</div>
