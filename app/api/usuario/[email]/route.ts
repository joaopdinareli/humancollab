import { readUsuarioByEmailController, updateUsuarioController, deleteUsuarioController } from '../../../../lib/controllers/usuario.controller';
import { withAuth } from '../../../../lib/withAuth';

export const GET = withAuth(readUsuarioByEmailController);
export const PUT = withAuth(updateUsuarioController);
export const DELETE = withAuth(deleteUsuarioController);