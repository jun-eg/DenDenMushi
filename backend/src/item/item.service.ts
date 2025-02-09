import { Injectable } from '@nestjs/common';
import { Item } from './item.model';
import { CreateItemDto } from './dto/create-item';
import { ItemStatus } from './item-status.enum';

@Injectable()
export class ItemService {
  private todoItems: Item[] = [];
  findAll(): Item[] {
    return this.todoItems;
  }

  create(createItem: CreateItemDto): Item {
    const item: Item = {
      ...createItem,
      status: ItemStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todoItems.push(item);
    return item;
  }
}
