import { updateTarefaController, deleteTarefaController } from '../../../../lib/controllers/tarefa.controller';
import { withAuth } from '../../../../lib/withAuth';

// GET /api/tarefa/:id
export const GET = withAuth(updateTarefaController)

// POST /api/tarefa/:id
export const POST = withAuth(deleteTarefaController);