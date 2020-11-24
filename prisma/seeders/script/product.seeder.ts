import { PrismaClient, products_status } from '@prisma/client'
import * as products from '../json/products.json'

export async function productSeeder(prisma: PrismaClient): Promise<void> {
    for (const product of products) {
        const productCreate = {
            name: product.name,
            khmer: product.khmer,
            low_stock_warning: product.low_stock_warning,
            status: product.status as products_status,
        }

        await prisma.product.upsert({
            create: productCreate,
            update: productCreate,
            where: {
                id: product.id,
            },
        })
    }
}