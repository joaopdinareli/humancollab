import { Router } from 'express';
import { getTarefas, postTarefa, putTarefa, deleteTarefa } from '../controllers/tarefa.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getTarefas);
router.post('/', authMiddleware, postTarefa);
router.put('/:id', authMiddleware, putTarefa);
router.delete('/:id', authMiddleware, deleteTarefa);

export default router;
