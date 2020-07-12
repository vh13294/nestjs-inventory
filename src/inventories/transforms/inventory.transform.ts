import { Inventory } from "@prisma/client";

export type responseInventory = {
    comment?: string | null
    createdAt?: Date | null
    createdBy?: number
    customerId?: number | null
    date?: Date
    deletedAt?: Date | null
    id?: number
    locationId?: number
    productId?: number
    quantity?: number
    supplierId?: number | null
    updatedAt?: Date | null
  }

export function inventoryTransform(inventory: Inventory): responseInventory {
    return {
        id: inventory.id,
        quantity: inventory.quantity,
    }
};