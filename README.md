# Novel API

REST API untuk platform novel online dengan fitur lengkap.

## Fitur

- 🔐 **Autentikasi JWT** - Access token & refresh token
- 👥 **Role-Based Access Control** - Admin & User
- 📚 **Novel Management** - CRUD dengan upload sampul
- 📖 **Chapter Management** - CRUD dengan penomoran otomatis
- 🏷️ **Genre Management** - Admin only
- 🔖 **Bookmark** - Simpan novel favorit
- 💬 **Komentar** - Komentar per chapter
- ⭐ **Rating** - Rating 1-5 dengan rata-rata otomatis
- 📜 **Riwayat Baca** - Otomatis tercatat saat login
- 📄 **Pagination, Sorting, Filtering**
- 📖 **Swagger Documentation**

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Docs**: Swagger/OpenAPI

## Instalasi

### Prerequisites

- Node.js 18+
- PostgreSQL
- Bun atau npm

### Setup

1. Clone repository
```bash
git clone https://github.com/Mavorynix/novel-api.git
cd novel-api
```

2. Install dependencies
```bash
bun install
# atau
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env sesuai konfigurasi database Anda
```

4. Setup database
```bash
bun run db:push
# atau untuk development dengan migration
bun run db:migrate
```

5. (Opsional) Seed data awal
```bash
bun run db:seed
```

6. Jalankan server
```bash
bun run dev
```

Server berjalan di `http://localhost:3000`

## API Endpoints

### Auth
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Register user baru | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| POST | `/api/auth/refresh` | Refresh token | ❌ |
| POST | `/api/auth/logout` | Logout | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Novels
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/novels` | List novels (pagination, filter, search) | ❌ |
| GET | `/api/novels/popular` | Popular novels | ❌ |
| GET | `/api/novels/latest` | Latest novels | ❌ |
| GET | `/api/novels/:id` | Get novel by ID | ❌ |
| GET | `/api/novels/slug/:slug` | Get novel by slug | ❌ |
| POST | `/api/novels` | Create novel | ✅ |
| PUT | `/api/novels/:id` | Update novel | ✅ (Owner/Admin) |
| DELETE | `/api/novels/:id` | Delete novel | ✅ (Owner/Admin) |

### Chapters
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/chapters/novel/:novelId` | List chapters | ❌ |
| GET | `/api/chapters/:id` | Get chapter with content | ❌ |
| POST | `/api/chapters/novel/:novelId` | Create chapter | ✅ (Owner/Admin) |
| PUT | `/api/chapters/:id` | Update chapter | ✅ (Owner/Admin) |
| DELETE | `/api/chapters/:id` | Delete chapter | ✅ (Owner/Admin) |

### Genres
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/genres` | List genres | ❌ |
| GET | `/api/genres/:id` | Get genre | ❌ |
| POST | `/api/genres` | Create genre | ✅ Admin |
| PUT | `/api/genres/:id` | Update genre | ✅ Admin |
| DELETE | `/api/genres/:id` | Delete genre | ✅ Admin |

### Bookmarks
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/bookmarks` | User's bookmarks | ✅ |
| POST | `/api/bookmarks/:novelId` | Add bookmark | ✅ |
| DELETE | `/api/bookmarks/:novelId` | Remove bookmark | ✅ |

### Comments
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/comments/chapter/:chapterId` | Chapter comments | ❌ |
| GET | `/api/comments/my` | User's comments | ✅ |
| POST | `/api/comments/chapter/:chapterId` | Add comment | ✅ |
| PUT | `/api/comments/:id` | Update comment | ✅ (Owner/Admin) |
| DELETE | `/api/comments/:id` | Delete comment | ✅ (Owner/Admin) |

### Ratings
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/ratings/:novelId` | Novel ratings & stats | ❌ |
| GET | `/api/ratings/:novelId/me` | User's rating | ✅ |
| POST | `/api/ratings/:novelId` | Rate novel | ✅ |
| DELETE | `/api/ratings/:novelId` | Remove rating | ✅ |

### Reading History
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/api/history` | User's reading history | ✅ |
| DELETE | `/api/history` | Clear all history | ✅ |
| DELETE | `/api/history/:id` | Delete history entry | ✅ |

## Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Sorting
- `sort` - Field to sort by
- `order` - `asc` or `desc`

### Filtering Novels
- `status` - ONGOING, COMPLETED, HIATUS
- `genre` - Genre slug
- `search` - Search in title/author

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/novel_api?schema=public"

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

## License

MIT
