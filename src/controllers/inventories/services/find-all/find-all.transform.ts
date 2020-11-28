import { Inventory } from '@prisma/client';

export type responseInventory = {
  comment?: string;
  createdBy?: number;
  customerId?: number;
  date?: Date;
  deletedAt?: Date;
  locationId?: number;
  productId?: number;
  supplierId?: number;

  id: number;
  quantity: number;
  createdAt: Date;
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
