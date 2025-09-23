import { readTarefasController, createTarefaController } from '../../../lib/controllers/tarefa.controller';
import { withAuth } from '../../../lib/withAuth';

// GET /api/tarefa
export const GET = withAuth(readTarefasController);

// POST /api/tarefa
export const POST = withAuth(createTarefaController);