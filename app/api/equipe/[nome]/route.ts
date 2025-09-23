import { readEquipeByNomeController, updateEquipeController, deleteEquipeController } from '../../../../lib/controllers/equipe.controller';
import { withAuth } from '../../../../lib/withAuth';

// GET /api/equipe/:nome
export const GET = withAuth(readEquipeByNomeController);

// PUT /api/equipe/:nome
export const PUT = withAuth(updateEquipeController);

// DELETE /api/equipe/:nome
export const DELETE = withAuth(deleteEquipeController);