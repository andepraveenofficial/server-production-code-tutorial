import { Router } from 'express';
import { authController } from '../controllers';
import authMiddleware from '../../../middlewares/auth.middleware';
import { validate } from '../../../middlewares/validate.middleware';
import { signinSchema, signupSchema } from '../validations/auth.validation';

const router = Router();

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/signin', validate(signinSchema), authController.signin);
router.get('/signout', authMiddleware, authController.signout);

export default router;
