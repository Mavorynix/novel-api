/**
 * Express Application Setup
 * Main application with middleware and routes for Novel API
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

import authRoutes from './routes/auth.routes';
import novelRoutes from './routes/novel.routes';
import chapterRoutes from './routes/chapter.routes';
import genreRoutes from './routes/genre.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import commentRoutes from './routes/comment.routes';
import ratingRoutes from './routes/rating.routes';
import historyRoutes from './routes/history.routes';
import uploadRoutes from './routes/upload.routes';

import { errorHandler, notFound } from './middleware/error.middleware';
import { swaggerSpec } from './config/swagger';
import { apiLimiter } from './config/rateLimit';
import { getCorsOptions } from './config/cors';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors(getCorsOptions()));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files for uploads
const uploadsPath = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsPath, {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  },
}));

// Rate limiting
app.use('/api/', apiLimiter);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Novel API Documentation',
}));

// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '📚 Novel API is running!',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: '/api/auth',
      novels: '/api/novels',
      chapters: '/api/chapters',
      genres: '/api/genres',
      bookmarks: '/api/bookmarks',
      comments: '/api/comments',
      ratings: '/api/ratings',
      history: '/api/history',
      upload: '/api/upload',
    },
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/novels', novelRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/upload', uploadRoutes);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

export default app;
