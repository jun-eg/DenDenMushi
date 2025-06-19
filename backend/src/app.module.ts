import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ItemModule } from "./item/item.module";
import { SignalingModule } from "./signaling/signaling.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ItemModule, SignalingModule],
})
export class AppModule {}
