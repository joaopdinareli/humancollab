import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../app/middleware';

export function withAuth<T>(
  handler: (req: NextRequest, context: T) => Promise<Response>
) {
  return async function (req: NextRequest, context: T) {
    const isAuth = await authMiddleware(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado!' }, { status: 401 });
    }
    return handler(req, context);
  };
}