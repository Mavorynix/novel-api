import { Request, Response, NextFunction, RequestHandler } from 'express';
import prisma from '../config/database';
import { buildPaginationMeta, sanitizeString, sanitizeHtmlContent } from '../utils/helpers';

/**
 * @swagger
 * /api/chapters/{chapterId}/comments:
 *   get:
 *     summary: Get comments for a chapter
 *     tags: [Comments]
 */
export const getComments: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { chapterId } = req.params;
    const { page = 1, limit = 20 } = req.query as any;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { chapterId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, username: true, avatar: true },
          },
        },
      }),
      prisma.comment.count({ where: { chapterId } }),
    ]);

    const pagination = buildPaginationMeta(total, page, limit);

    res.json({
      success: true,
      data: comments,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/chapters/{chapterId}/comments:
 *   post:
 *     summary: Add a comment to a chapter
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
export const addComment: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    const { chapterId } = req.params;
    const { content } = req.body;

    // Check if chapter exists
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { id: true, title: true, novelId: true },
    });

    if (!chapter) {
      res.status(404).json({
        success: false,
        error: 'Chapter not found',
      });
      return;
    }

    const comment = await prisma.comment.create({
      data: {
        content: sanitizeHtmlContent(content),
        userId: req.user.id,
        chapterId,
      },
      include: {
        user: {
          select: { id: true, username: true, avatar: true },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
export const updateComment: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    const { id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
      return;
    }

    if (comment.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        error: 'You can only edit your own comments',
      });
      return;
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content: sanitizeHtmlContent(content) },
      include: {
        user: {
          select: { id: true, username: true, avatar: true },
        },
      },
    });

    res.json({
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
export const deleteComment: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
      return;
    }

    if (comment.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        error: 'You can only delete your own comments',
      });
      return;
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/comments/my:
 *   get:
 *     summary: Get user's comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 */
export const getMyComments: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    const { page = 1, limit = 20 } = req.query as any;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { userId: req.user.id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          chapter: {
            select: {
              id: true,
              title: true,
              chapterNum: true,
              novel: {
                select: { id: true, title: true, slug: true },
              },
            },
          },
        },
      }),
      prisma.comment.count({ where: { userId: req.user.id } }),
    ]);

    const pagination = buildPaginationMeta(total, page, limit);

    res.json({
      success: true,
      data: comments,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};
