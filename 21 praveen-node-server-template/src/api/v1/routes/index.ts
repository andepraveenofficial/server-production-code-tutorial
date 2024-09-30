import express from 'express';
import productRoutes from './product.route';
import authRoutes from './auth.route';
import roleMiddleware from '../../../middlewares/role.middleware';
import authMiddleware from '../../../middlewares/auth.middleware';
import viewRoutes from './view.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use(
  '/products',
  authMiddleware,
  roleMiddleware(['MANAGER']),
  productRoutes,
);
router.use('/', viewRoutes);

export default router;
