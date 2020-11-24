import { PrismaClient, locations_status } from '@prisma/client'
import * as locations from '../json/locations.json'

export async function locationSeeder(prisma: PrismaClient): Promise<void> {
    for (const location of locations) {
        const locationCreate = {
            name: location.name,
            status: location.status as locations_status,
        }

        await prisma.location.upsert({
            create: locationCreate,
            update: locationCreate,
            where: {
                id: location.id,
            },
        })
    }
}