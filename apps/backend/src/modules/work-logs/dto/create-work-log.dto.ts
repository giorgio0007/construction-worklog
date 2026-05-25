import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkLogDto {
  @ApiProperty({
    example: '2026-05-25',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 'uuid',
  })
  @IsUUID()
  workTypeId: string;

  @ApiProperty({
    example: 24,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  volume: number;

  @ApiProperty({
    example: 'м³',
  })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({
    example: 'Иванов И.И.',
  })
  @IsString()
  @IsNotEmpty()
  workerName: string;

  @ApiProperty({
    example: 'Секция Б',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
