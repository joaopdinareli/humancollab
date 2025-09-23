import { readEquipesByUsuariosEmailController } from '../../../../../lib/controllers/equipe.controller';
import { withAuth } from '../../../../../lib/withAuth';

// GET /api/equipe/usuario/:email
export const GET = withAuth(readEquipesByUsuariosEmailController)