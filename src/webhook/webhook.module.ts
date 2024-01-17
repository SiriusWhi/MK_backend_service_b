import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { WebhookLogService } from './services/webhook-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookLog } from './entities/webhook-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebhookLog])],
  controllers: [WebhookController],
  providers: [WebhookLogService],
})
export class WebhookModule {}
