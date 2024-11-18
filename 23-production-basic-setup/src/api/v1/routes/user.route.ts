import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .patch(userController.updateUserPart)
  .delete(userController.deleteUser);

export default router;
