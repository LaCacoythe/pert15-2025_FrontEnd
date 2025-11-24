import { PrismaClient } from '@prisma/client'
import path from 'path'

function getDatabaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    const filePath = path.join(process.cwd(), 'prisma/local.db')
    return `file:${filePath}`
  } else {
    return process.env.DATABASE_URL || 'file:./dev.db'
  }
}

const prismaClientConfig = {
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaClientConfig)
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient(prismaClientConfig)
  }
  prisma = global.cachedPrisma
}

export default prisma