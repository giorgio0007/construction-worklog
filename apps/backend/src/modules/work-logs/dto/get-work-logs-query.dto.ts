import { IsDateString, IsIn, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetWorkLogsQueryDto {
  @ApiPropertyOptional({
    example: '2026-05-01',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    example: '2026-05-31',
  })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiPropertyOptional({
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
