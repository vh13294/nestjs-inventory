import { Inventory } from '@prisma/client';

export type responseInventory = {
  comment?: string;
  createdAt: Date;
  createdBy?: number;
  customerId?: number;
  date?: Date;
  deletedAt?: Date;
  id: number;
  locationId?: number;
  productId?: number;
  quantity: number;
  supplierId?: number;
  updatedAt: Date;
};

export function inventoryTransform(inventory: Inventory): responseInventory {
  return {
    id: inventory.id,
    quantity: inventory.quantity,
    createdAt: inventory.created_at,
    updatedAt: inventory.updated_at,
  };
}
