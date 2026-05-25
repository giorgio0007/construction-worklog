import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWorkLogDto {
  @ApiPropertyOptional({
    example: '2026-05-25',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  workTypeId?: string;

  @ApiPropertyOptional({
    example: 24,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  volume?: number;

  @ApiPropertyOptional({
    example: 'м³',
  })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({
    example: 'Иванов И.И.',
  })
  @IsOptional()
  @IsString()
  workerName?: string;

  @ApiPropertyOptional({
    example: 'Секция Б',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
