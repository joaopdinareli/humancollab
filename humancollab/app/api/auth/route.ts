import { Router } from 'express';
import { loginController, meController } from '../../../lib/controllers/auth.controller';
import { authMiddleware } from '../../middleware';

const router = Router();

router.post('/login', loginController);
router.get('/me', authMiddleware, meController);
export default router;