import { NextRequest} from 'next/server';
import { loginController, meController } from '../../../lib/controllers/auth.controller';
import { withAuth } from '../../../lib/withAuth';

// POST /api/auth
export async function POST(req: NextRequest) {
  return loginController(req);
}

// GET /api/auth
export const GET = withAuth(meController);