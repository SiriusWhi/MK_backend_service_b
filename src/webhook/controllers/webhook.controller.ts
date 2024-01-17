import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWebhookDto } from '../dto/webhook.dto';
import * as ccxt from 'ccxt';
import { Response } from 'express';
import { WebhookLogService } from '../services/webhook-log.service';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhookController {
  constructor(private webhookLogService: WebhookLogService) {}

  @Post()
  @ApiOperation({ summary: 'Post data to our webhook' })
  @ApiBody({
    type: CreateWebhookDto,
  })
  async handler(@Body() body: CreateWebhookDto, @Res() res: Response) {
    const okx = new ccxt.okx();

    try {
      const { symbol, amount } = body;
      const order = await okx.createMarketSellOrder(symbol, amount);

      if (process.env.WEBHOOK_ENABLE_LOGGING === '1') {
        try {
          await this.webhookLogService.createWebhookLog({
            received_date: new Date().toISOString(),
            payload: JSON.stringify(body),
            source: 'unknown',
            result: JSON.stringify(order),
            is_success: true,
          });
        } catch (e) {
          console.error(e);
        }
      }

      return order;
    } catch (e) {
      if (process.env.WEBHOOK_ENABLE_LOGGING === '1') {
        try {
          await this.webhookLogService.createWebhookLog({
            received_date: new Date().toISOString(),
            payload: JSON.stringify(body),
            source: 'unknown',
            result: JSON.stringify(e),
            is_success: false,
          });
        } catch (e) {
          console.error(e);
        }
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json(e?.message ?? 'An unknown error occurred');
    }
  }
}
