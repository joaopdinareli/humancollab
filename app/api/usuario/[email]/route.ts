import { readUsuarioByEmailController, updateUsuarioController, deleteUsuarioController } from '../../../../lib/controllers/usuario.controller';
import { withAuth } from '../../../../lib/withAuth';

// GET /api/usuario/:email
export const GET = withAuth(readUsuarioByEmailController);

// PUT /api/usuario/:email
export const PUT = withAuth(updateUsuarioController);

// DELETE /api/tarefa/:email
export const DELETE = withAuth(deleteUsuarioController);