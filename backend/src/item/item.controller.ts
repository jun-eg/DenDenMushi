import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.model';
import { CreateItemDto } from './dto/create-item';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Item[] {
    return this.itemService.findAll();
  }

  @Post()
  create(@Body() createItem: CreateItemDto): Item {
    return this.itemService.create(createItem);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): string {
    return this.itemService.delete(id);
  }
}
