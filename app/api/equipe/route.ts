import { readAllEquipesController, createEquipeController } from '../../../lib/controllers/equipe.controller';
import { withAuth } from '../../../lib/withAuth';

// GET /api/equipe
export const GET = withAuth(readAllEquipesController);

// POST /api/equipe
export const POST = withAuth(createEquipeController);