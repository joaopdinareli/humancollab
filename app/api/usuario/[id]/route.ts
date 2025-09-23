import { readUsuarioByIdController } from '../../../../lib/controllers/usuario.controller';
import { withAuth } from '../../../../lib/withAuth';

export const GET = withAuth(readUsuarioByIdController);