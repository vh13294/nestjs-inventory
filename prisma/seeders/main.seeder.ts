import { PrismaClient } from '@prisma/client'
import { customerSeeder } from './script/customer.seeder'

async function main() {
    const prisma = new PrismaClient()

    await Promise.all([
        customerSeeder(prisma),
    ]).catch(console.error)

    await prisma.$disconnect()
    console.log('seeders generated')
};

main()