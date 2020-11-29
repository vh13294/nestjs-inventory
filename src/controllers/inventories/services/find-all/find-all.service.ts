import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { responseInventory, inventoryTransform } from './find-all.transform';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindAllService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<responseInventory[]> {
    const inventories = await this.prismaService.inventory.findMany({
      take: 10,
      orderBy: [
        {
          id: Prisma.SortOrder.desc,
        },
      ],
    });
    return inventories.map(inventoryTransform);
  }

  async testRaw(): Promise<unknown> {
    return this.prismaService
      .$queryRaw`select products.id                                  as product_id,
                CONCAT(products.name, ' - ', products.khmer) as product_name,
                groupByPrice.id                              as price_id,
                CONCAT(units.amount, ' - ', units.unit)      as unit_name,
                effective_date,
                price_USD,
                price_riel,
                users.name                                   as user_name,
                groupByPrice.created_at                      as price_created_at
 
        from products
                left join (select temp.*
                            from prices as temp
                                    inner join (
                                select product_id, unit_id, max(effective_date) as effective_date
                                from prices
                                group by product_id, unit_id
                            ) as temp2
                                                on temp.product_id = temp2.product_id and temp.unit_id = temp2.unit_id and
                                                    temp.effective_date = temp2.effective_date) as groupByPrice
                            on products.id = groupByPrice.product_id
        
                left join users on users.id = groupByPrice.created_by
        
                left join units on units.id = groupByPrice.unit_id
        
        where products.status = 'active'
        order by products.name asc`;
  }
}
