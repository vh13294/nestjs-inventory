import { PrismaClient } from '@prisma/client'

import { customerSeeder } from './script/customer.seeder'
import { locationSeeder } from './script/location.seeder'
import { productSeeder } from './script/product.seeder'
import { supplierSeeder } from './script/supplier.seeder'
import { userSeeder } from './script/user.seeder'

async function main() {
    const prisma = new PrismaClient()

    await Promise.all([
        customerSeeder(prisma),
        locationSeeder(prisma),
        productSeeder(prisma),
        supplierSeeder(prisma),
        userSeeder(prisma),
    ]).catch(console.error)

    await prisma.$disconnect()
    console.log('Seeders generated')
};

main()