import { InventoryGetPayload, InventorySelect } from "@prisma/client";

type CheckSelectKeys<T, U> = {
    [K in keyof T]: K extends keyof U ? T[K] : never;
};

const createInventorySelect = <T extends InventorySelect>(
    arg: CheckSelectKeys<T, InventorySelect>
) => arg;

export const findSingleLocationSelect = createInventorySelect({
    id: true,
    quantity: true,
    created_at: true,
    updated_at: true,
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
})

type findSingleLocationSelectGen = InventoryGetPayload<{
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
    location: {
        id: number,
        name: string,
    }
    product: {
        id: number,
        name: string,
    }
    quantity: number
    supplierId?: number
    updatedAt: Date
}

export function findSingleLocationInventoryTransform(
    inventories: findSingleLocationSelectGen[],
    sum: number,
): findSingleLocationInventory[] {
    return inventories.map(inventory => {
        const result = {
            id: inventory.id,
            quantity: inventory.quantity,
            createdAt: inventory.created_at,
            updatedAt: inventory.updated_at,
            location: inventory.location,
            product: inventory.product,
            total: sum
        };
        sum -= inventory.quantity;
        return result;
    })
};
