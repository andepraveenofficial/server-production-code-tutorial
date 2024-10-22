import { Router } from 'express';
import { authController } from '../controllers';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/signout', authMiddleware, authController.signout);

export default router;
