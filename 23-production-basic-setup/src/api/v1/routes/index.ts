import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import authMiddleware from '../../../middlewares/auth.middleware';
import roleMiddleware from '../../../middlewares/role.middleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', authMiddleware, roleMiddleware(['ADMIN']), userRoutes);

export default router;
