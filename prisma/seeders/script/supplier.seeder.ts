import { PrismaClient, suppliers_status } from '@prisma/client'
import * as suppliers from '../json/suppliers.json'

export async function supplierSeeder(prisma: PrismaClient): Promise<void> {
    for (const supplier of suppliers) {
        const supplierCreate = {
            name: supplier.name,
            khmer: supplier.khmer,
            status: supplier.status as suppliers_status,
        }

        await prisma.supplier.upsert({
            create: supplierCreate,
            update: supplierCreate,
            where: {
                id: supplier.id,
            },
        })
    }
}