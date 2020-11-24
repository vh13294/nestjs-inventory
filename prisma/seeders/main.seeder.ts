import { PrismaClient } from '@prisma/client'

import { customerSeeder } from './script/customer.seeder'
import { inventorySeeder } from './script/inventory.seeder'
import { locationSeeder } from './script/location.seeder'
import { productSeeder } from './script/product.seeder'
import { supplierSeeder } from './script/supplier.seeder'
import { userSeeder } from './script/user.seeder'

async function main() {
    console.time()
    const prisma = new PrismaClient()

    // static data
    await Promise.all([
        customerSeeder(prisma),
        locationSeeder(prisma),
        productSeeder(prisma),
        supplierSeeder(prisma),
        userSeeder(prisma),
    ]).catch(console.error)

    // dynamic data
    await Promise.all([
        inventorySeeder(prisma),
    ]).catch(console.error)

    await prisma.$disconnect()
    console.log('Seeders generated')
    console.timeEnd()
};

main()