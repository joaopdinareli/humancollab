// Importa a classe principal do Prisma Client
import { PrismaClient } from '@prisma/client'

// Declara o prisma globalmente para evitar que o Next.js
// crie múltiplas instâncias em ambientes de desenvolvimento
declare global {
  var prisma: PrismaClient | undefined
}

// Se o prisma já existe globalmente, usa a instância existente.
// Se não, cria uma nova.
export const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// Em desenvolvimento, salva a instância globalmente para reuso.
// Isso evita que o Hot Reload do Next.js crie novas instâncias.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}