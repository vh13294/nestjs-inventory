import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function inventorySeeder(prisma: PrismaClient): Promise<void> {
    for (let i = 0; i < 1000; i++) {
        const date = faker.date.past(1)

        await prisma.inventory.create({
            data: {
                date: date,
                quantity: faker.random.number({ min: 10, max: 50 }),
                comment: faker.lorem.sentence(faker.random.number({ min: 1, max: 8 })),
                created_at: date,
                updated_at: date,
                deleted_at: faker.random.arrayElement([faker.date.future(1), null]),
                created_by: 1,
                customer_id: 1,
                location_id: 1,
                product_id: 1,
                supplier_id: 1,
            }
        })
    }
}