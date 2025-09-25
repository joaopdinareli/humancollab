import { readUsuariosController, createUsuarioController } from '../../../lib/controllers/usuario.controller';

import { withAuth } from '../../../lib/withAuth'

// GET /api/usuario
export const GET = withAuth(readUsuariosController);

// POST /api/usuario
export const POST = withAuth(createUsuarioController);