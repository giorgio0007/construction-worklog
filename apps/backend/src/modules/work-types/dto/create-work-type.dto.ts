import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkTypeDto {
  @ApiProperty({
    example: 'Монтаж опалубки',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
