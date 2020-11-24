import { PrismaClient } from '@prisma/client'
import * as faker from 'faker'

export async function inventorySeeder(prisma: PrismaClient): Promise<void> {
    const year = new Date().getFullYear();
    const date = faker.date.past(year)

    for (let i = 0; i < 100000; i++) {
        await prisma.inventory.create({
            data: {
                date: date,
                quantity: faker.random.number({ min: 10, max: 50 }),
                comment: faker.lorem.sentence(5, 2),
                created_at: date,
                updated_at: date,
                deleted_at: faker.random.arrayElement([faker.date.future(null, date), null]),
                created_by: 1,
                customer_id: 1,
                location_id: 1,
                product_id: 1,
                supplier_id: 1,
            }
        })
    }
}