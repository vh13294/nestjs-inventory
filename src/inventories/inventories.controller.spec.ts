import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesController } from './inventories.controller';

describe('Inventories Controller', () => {
  let controller: InventoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesController],
    }).compile();

    controller = module.get<InventoriesController>(InventoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
