import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Item[] {
    return this.itemService.findAll();
  }

  @Post()
  create(@Body('id') id: string, @Body('body') body: string): Item {
    return this.itemService.create({
      id,
      body,
      status: ItemStatus.TODO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
