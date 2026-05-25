import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WorkTypesService } from './work-types.service';

import { CreateWorkTypeDto } from './dto/create-work-type.dto';

@ApiTags('Work Types')
@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly workTypesService: WorkTypesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all work types',
  })
  @ApiResponse({
    status: 200,
    description: 'List of work types',
  })
  findAll() {
    return this.workTypesService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create work type',
  })
  @ApiResponse({
    status: 201,
    description: 'Work type created',
  })
  create(
    @Body()
    createWorkTypeDto: CreateWorkTypeDto,
  ) {
    return this.workTypesService.create(createWorkTypeDto);
  }
}
