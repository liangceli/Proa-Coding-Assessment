import { Module } from '@nestjs/common';
import { StationsModule } from './stations/stations.module';
import { FilterModule } from './filter/filter.module';
@Module({
  imports: [StationsModule, FilterModule],
})
export class AppModule {}
