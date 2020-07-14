import { InventoryGetPayload, InventorySelect, Location, Product } from "@prisma/client";

export const findSingleLocationSelect: InventorySelect = {
    id: true,
    quantity: true,
    product: {
        select: {
            id: true,
            name: true,
        }
    },
    location: {
        select: {
            id: true,
            name: true,
        }
    },
    customer: {
        select: {
            id: true,
            name: true,
        }
    },
    supplier: {
        select: {
            id: true,
            name: true,
        }
    },
    user: {
        select: {
            id: true,
            name: true,
        }
    },
}

type FindSingleLocationInventory = InventoryGetPayload<{
    select: typeof findSingleLocationSelect
}>

export type findSingleLocationInventory = {
    comment?: string
    createdAt: Date
    createdBy?: number
    customerId?: number
    date?: Date
    deletedAt?: Date
    id: number
    location: Location
    product: Product
    quantity: number
    supplierId?: number
    updatedAt: Date
}

export function findSingleLocationInventoryTransform(
    inventory: FindSingleLocationInventory,
): findSingleLocationInventory {
    return {
        id: inventory.id,
        quantity: inventory.quantity,
        createdAt: inventory.created_at,
        updatedAt: inventory.updated_at,
        location: inventory.location,
        product: inventory.product,
    }
};

export type pagination<T> = {
    data: T,
    total: number,
}

export function paginate<T>(data: T, total: number): pagination<T> {
    return {
        data: data,
        total: total,
    };
}