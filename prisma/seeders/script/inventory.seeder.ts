import { PrismaClient } from '@prisma/client'
import { Chance } from 'chance'

export async function inventorySeeder(prisma: PrismaClient): Promise<void> {
    const chance = new Chance()
    const year = new Date().getFullYear();

    for (let i = 0; i < 100000; i++) {
        await prisma.inventory.create({
            data: {
                date: chance.date({ year: year }),
                quantity: chance.integer({ min: 1, max: 200 }),
                comment: chance.sentence({ words: 5 }),
                created_at: chance.date({ year: year }),
                updated_at: chance.date({ year: year }),
                deleted_at: chance.pickone([chance.date({ year: year }), null]),
                created_by: 1,
                customer_id: 1,
                location_id: 1,
                product_id: 1,
                supplier_id: 1,
            }
        })
    }
}