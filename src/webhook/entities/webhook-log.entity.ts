import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WebhookLog {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    type: 'date',
  })
  received_date: string;

  @Column({
    type: 'varchar',
  })
  source: string;

  @Column({
    type: 'text',
  })
  payload: string;

  @Column({
    type: 'text',
  })
  result: string;

  @Column({
    type: 'boolean',
  })
  is_success: boolean;
}
