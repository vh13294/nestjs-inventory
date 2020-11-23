import { PrismaClient, customers_status } from '@prisma/client'
import * as customers from '../json/customers.json'

export async function customerSeeder(prisma: PrismaClient): Promise<void> {
    for (const customer of customers) {
        const customerCreate = {
            name: customer.name,
            khmer: customer.khmer,
            status: customer.status as customers_status,
        }

        await prisma.customer.upsert({
            create: customerCreate,
            update: customerCreate,
            where: {
                id: customer.id,
            },
        })
    }
}