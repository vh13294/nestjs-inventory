import { Prisma, InventorySelect, Subset } from '@prisma/client';

const createInventorySelect = <T extends InventorySelect>(
  arg: Subset<T, InventorySelect>,
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
    },
  },
  location: {
    select: {
      id: true,
      name: true,
    },
  },
  customer: {
    select: {
      id: true,
      name: true,
    },
  },
  supplier: {
    select: {
      id: true,
      name: true,
    },
  },
  user: {
    select: {
      id: true,
      name: true,
    },
  },
});

type findSingleLocationSelectGen = Prisma.InventoryGetPayload<{
  select: typeof findSingleLocationSelect;
}>;

export type findSingleLocationInventory = {
  comment?: string;
  createdAt: Date;
  createdBy?: number;
  customerId?: number;
  supplierId?: number;
  date?: Date;
  deletedAt?: Date;
  id: number;
  location: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  quantity: number;
  updatedAt: Date;
};

export function findSingleLocationInventoryTransform(
  inventories: findSingleLocationSelectGen[],
  sum: number,
): findSingleLocationInventory[] {
  return inventories.map((inventory) => {
    const result = {
      id: inventory.id,
      quantity: inventory.quantity,
      createdAt: inventory.created_at,
      updatedAt: inventory.updated_at,
      location: inventory.location,
      product: inventory.product,
      total: sum,
    };
    sum -= inventory.quantity;
    return result;
  });
}
