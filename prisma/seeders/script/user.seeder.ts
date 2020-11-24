import { PrismaClient } from '@prisma/client'
import * as users from '../json/users.json'

export async function userSeeder(prisma: PrismaClient): Promise<void> {
    for (const user of users) {
        const userCreate = {
            name: user.name,
            email: user.email,
            password: user.password,
            api_token: user.api_token,
        }

        await prisma.user.upsert({
            create: userCreate,
            update: userCreate,
            where: {
                id: user.id,
            },
        })
    }
}