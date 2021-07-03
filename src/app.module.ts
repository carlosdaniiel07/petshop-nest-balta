import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from '@modules/backoffice/backoffice.module';
import { StoreModule } from '@modules/store/store.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    BackofficeModule,
    StoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
