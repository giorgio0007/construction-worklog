import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkLogsModule } from './modules/work-logs/work-logs.module';
import { WorkTypesModule } from './modules/work-types/work-types.module';

@Module({
  imports: [WorkLogsModule, WorkTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
