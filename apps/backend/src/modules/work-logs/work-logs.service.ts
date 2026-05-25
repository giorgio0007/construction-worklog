import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetWorkLogsQueryDto } from './dto/get-work-logs-query.dto';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';

@Injectable()
export class WorkLogsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findWorkLogOrThrow(id: string) {
    const workLog = await this.prisma.workLog.findUnique({
      where: {
        id,
      },
    });

    if (!workLog) {
      throw new NotFoundException('Work log not found');
    }

    return workLog;
  }

  async create(createWorkLogDto: CreateWorkLogDto) {
    const workType = await this.prisma.workType.findUnique({
      where: {
        id: createWorkLogDto.workTypeId,
      },
    });

    if (!workType) {
      throw new NotFoundException('Work type not found');
    }

    return this.prisma.workLog.create({
      data: {
        date: new Date(createWorkLogDto.date),

        volume: createWorkLogDto.volume,

        unit: createWorkLogDto.unit,

        workerName: createWorkLogDto.workerName,

        comment: createWorkLogDto.comment,

        workTypeId: createWorkLogDto.workTypeId,
      },

      include: {
        workType: true,
      },
    });
  }

  async findAll(query: GetWorkLogsQueryDto) {
    const { from, to, sort = 'desc' } = query;

    const where: Prisma.WorkLogWhereInput = {};

    if (from || to) {
      where.date = {};

      if (from) {
        where.date.gte = new Date(from);
      }

      if (to) {
        where.date.lte = new Date(to);
      }
    }

    return this.prisma.workLog.findMany({
      where,

      orderBy: {
        date: sort,
      },

      include: {
        workType: true,
      },
    });
  }

  async update(id: string, updateWorkLogDto: UpdateWorkLogDto) {
    await this.findWorkLogOrThrow(id);

    if (updateWorkLogDto.workTypeId) {
      const workType = await this.prisma.workType.findUnique({
        where: {
          id: updateWorkLogDto.workTypeId,
        },
      });

      if (!workType) {
        throw new NotFoundException('Work type not found');
      }
    }

    return this.prisma.workLog.update({
      where: {
        id,
      },

      data: {
        ...updateWorkLogDto,

        ...(updateWorkLogDto.date && {
          date: new Date(updateWorkLogDto.date),
        }),
      },

      include: {
        workType: true,
      },
    });
  }

  async remove(id: string) {
    await this.findWorkLogOrThrow(id);

    await this.prisma.workLog.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Work log deleted successfully',
    };
  }
}
