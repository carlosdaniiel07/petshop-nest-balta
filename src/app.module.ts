import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from '@modules/backoffice/backoffice.module';
import { StoreModule } from '@modules/store/store.module';
import { AuthModule } from '@modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@shared/guards/roles.guard';
import { AgendaModule } from './modules/agenda/agenda.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [BackofficeModule, StoreModule, AuthModule, AgendaModule, ReportModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
