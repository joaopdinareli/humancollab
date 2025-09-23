import { readUsuariosController, createUsuarioController } from '../../../lib/controllers/usuario.controller';

import { withAuth } from '../../../lib/withAuth'

export const GET = withAuth(readUsuariosController);
export const POST = withAuth(createUsuarioController);