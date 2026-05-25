import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WorkLogsService } from './work-logs.service';

import { GetWorkLogsQueryDto } from './dto/get-work-logs-query.dto';

import { CreateWorkLogDto } from './dto/create-work-log.dto';

import { UpdateWorkLogDto } from './dto/update-work-log.dto';

@ApiTags('Work Logs')
@Controller('work-logs')
export class WorkLogsController {
  constructor(private readonly workLogsService: WorkLogsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create work log',
  })
  @ApiResponse({
    status: 201,
    description: 'Work log created',
  })
  create(
    @Body()
    createWorkLogDto: CreateWorkLogDto,
  ) {
    return this.workLogsService.create(createWorkLogDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update work log',
  })
  @ApiResponse({
    status: 200,
    description: 'Work log updated',
  })
  update(
    @Param('id') id: string,

    @Body()
    updateWorkLogDto: UpdateWorkLogDto,
  ) {
    return this.workLogsService.update(id, updateWorkLogDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete work log',
  })
  @ApiResponse({
    status: 200,
    description: 'Work log deleted',
  })
  remove(@Param('id') id: string) {
    return this.workLogsService.remove(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get work logs list',
  })
  @ApiResponse({
    status: 200,
    description: 'List of work logs',
  })
  findAll(
    @Query()
    query: GetWorkLogsQueryDto,
  ) {
    return this.workLogsService.findAll(query);
  }
}
