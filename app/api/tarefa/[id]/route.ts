import { updateTarefaController, deleteTarefaController } from '../../../../lib/controllers/tarefa.controller';
import { withAuth } from '../../../../lib/withAuth';

// PUT /api/tarefa/:id
export const PUT = withAuth(updateTarefaController)

// DELETE /api/tarefa/:id
export const DELETE = withAuth(deleteTarefaController);