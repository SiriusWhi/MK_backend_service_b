import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateWebhookDto {
  @ApiProperty()
  @IsString()
  received_date: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty({
    description: 'Our payload used to create a new order',
  })
  @IsString()
  payload: string;

  @ApiProperty({
    description: 'The order create result in JSON',
  })
  @IsString()
  result: string;

  @ApiProperty()
  @IsBoolean()
  is_success: boolean;
}
