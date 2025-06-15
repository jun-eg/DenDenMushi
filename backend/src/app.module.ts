import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ItemModule } from "./item/item.module";
import { SignalingGateway } from "./signaling/signaling.gateway";

@Module({
  controllers: [AppController],
  providers: [AppService, SignalingGateway],
  imports: [ItemModule],
})
export class AppModule {}
