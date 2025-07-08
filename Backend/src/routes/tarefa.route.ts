import { Router } from 'express';
import { getTarefas } from '../controllers/tarefa.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getTarefas);

export default router;
