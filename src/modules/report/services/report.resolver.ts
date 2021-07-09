import { Query, Resolver } from '@nestjs/graphql';
import { Product } from '@modules/report/models/product.model';
import { ReportService } from './report.service';

@Resolver(() => Product)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.reportService.findAll(null);
  }
}
