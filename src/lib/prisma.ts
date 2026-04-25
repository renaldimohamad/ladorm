import { PrismaClient } from '../generated/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// We use a getter to avoid initializing Prisma during static analysis/build
const prisma = {
  get client() {
    if (typeof window !== 'undefined') return null as any;
    if (!globalThis.prisma) {
      globalThis.prisma = prismaClientSingleton();
    }
    return globalThis.prisma;
  }
}

export default new Proxy({}, {
  get: (target, prop) => {
    const client = prisma.client;
    if (!client) return undefined;
    return (client as any)[prop];
  }
}) as PrismaClient;
