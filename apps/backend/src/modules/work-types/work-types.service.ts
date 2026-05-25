import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateWorkTypeDto } from './dto/create-work-type.dto';

@Injectable()
export class WorkTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async create(createWorkTypeDto: CreateWorkTypeDto) {
    return this.prisma.workType.create({
      data: createWorkTypeDto,
    });
  }
}
