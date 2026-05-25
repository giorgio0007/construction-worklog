import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';

import { WorkLogsModule } from './modules/work-logs/work-logs.module';
import { WorkTypesModule } from './modules/work-types/work-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,

    WorkLogsModule,
    WorkTypesModule,
  ],
})
export class AppModule {}
