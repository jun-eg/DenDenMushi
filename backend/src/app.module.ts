import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ItemModule],
})
export class AppModule {}
