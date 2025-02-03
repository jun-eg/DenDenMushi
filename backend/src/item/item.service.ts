import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemService {
  private todoItems: Item[] = [];
  findAll(): Item[] {
    return this.todoItems;
  }

  create(item: Item) {
    this.todoItems.push(item);
    return item;
  }
}
