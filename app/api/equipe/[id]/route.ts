import { readEquipeByIdController } from '../../../../lib/controllers/equipe.controller';
import { withAuth } from '../../../../lib/withAuth';

// GET /api/equipe/:id
export const GET = withAuth(readEquipeByIdController);