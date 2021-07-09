import { StoreModule } from '@modules/store/store.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ReportService } from '@modules/report/services/report.service';
import { ReportResolver } from '@modules/report/services/report.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    StoreModule,
  ],
  providers: [ReportService, ReportResolver],
})
export class ReportModule {}
