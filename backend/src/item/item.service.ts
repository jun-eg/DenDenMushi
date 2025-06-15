import { Injectable } from "@nestjs/common";
import { Item } from "./item.model";
import { CreateItemDto } from "./dto/create-item";
import { ItemStatus } from "./item-status.enum";
import { v4 as uuid } from "uuid";

@Injectable()
export class ItemService {
  private todoItems: Item[] = [];

  findAll(): Item[] {
    return this.todoItems;
  }

  create(createItem: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItem,
      status: ItemStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todoItems.push(item);
    return item;
  }

  delete(id: string): string {
    this.todoItems = this.todoItems.filter((item) => item.id !== id);
    return `item_id: ${id} を消去しました。`;
  }
}
