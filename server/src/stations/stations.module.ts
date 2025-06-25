import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';

@Module({
  providers: [StationsService]
})
export class StationsModule {}
