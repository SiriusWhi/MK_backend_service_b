import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WebhookLog } from '../entities/webhook-log.entity';
import { CreateWebhookDto } from '../dto/webhook-log.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WebhookLogService {
  constructor(
    @InjectRepository(WebhookLog)
    private webhookLogRepository: Repository<WebhookLog>,
  ) {}

  async createWebhookLog({
    received_date,
    payload,
    source,
    result,
    is_success,
  }: CreateWebhookDto): Promise<WebhookLog> {
    const webhookLog = new WebhookLog();
    webhookLog.received_date = received_date;
    webhookLog.source = source;
    webhookLog.payload = payload;
    webhookLog.result = result;
    webhookLog.is_success = is_success;

    return this.webhookLogRepository.save(webhookLog);
  }
}
