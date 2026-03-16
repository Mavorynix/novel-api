import { Router } from 'express';
import {
  getNovels,
  getNovelById,
  getNovelBySlug,
  createNovel,
  updateNovel,
  deleteNovel,
  getPopularNovels,
  getLatestNovels,
} from '../controllers/novel.controller';
import { validate } from '../middleware/validate.middleware';
import { auth, optionalAuth } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/auth.middleware';
import { uploadCover } from '../config/upload';
import {
  novelQuerySchema,
  novelIdSchema,
  novelSlugSchema,
  createNovelSchema,
  updateNovelSchema,
} from '../validation/novel.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Novels
 *   description: Novel management
 */

// Public routes
router.get('/', validate(novelQuerySchema), getNovels);
router.get('/popular', getPopularNovels);
router.get('/latest', getLatestNovels);
router.get('/slug/:slug', validate(novelSlugSchema), getNovelBySlug);
router.get('/:id', validate(novelIdSchema), optionalAuth, getNovelById);

// Protected routes (require auth)
router.post('/', auth, uploadCover.single('cover'), validate(createNovelSchema), createNovel);
router.put('/:id', auth, uploadCover.single('cover'), validate(updateNovelSchema), updateNovel);
router.delete('/:id', auth, validate(novelIdSchema), deleteNovel);

export default router;
