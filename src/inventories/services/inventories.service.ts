import { Injectable } from '@nestjs/common';
import { Inventory } from '../interfaces/inventory.interface';

@Injectable()
export class InventoriesService {
    private readonly inventories: Inventory[] = [];

    create(inventory: Inventory): Inventory {
        this.inventories.push(inventory);
        return inventory;
    }

    findAll(): Inventory[] {
        return this.inventories;
    }
}
