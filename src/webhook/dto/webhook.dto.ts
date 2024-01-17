import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateWebhookDto {
  @ApiProperty({
    example: 'TSLA',
    required: true,
  })
  @IsString()
  symbol: string;

  @ApiProperty({
    example: 1000.1,
    required: true,
  })
  @IsNumber()
  amount: number;
}
