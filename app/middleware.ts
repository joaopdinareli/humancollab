import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Middleware adaptado para Next.js App Router
export const authMiddleware = async (req: NextRequest): Promise<boolean> => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return true;
  } catch {
    return false;
  }
};