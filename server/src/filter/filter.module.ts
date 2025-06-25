import { Module } from '@nestjs/common';
import { StationFilterController } from './filter.controller';
import { StationFilterService } from './filter.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [StationFilterController],
  providers: [StationFilterService, PrismaService],
})
export class FilterModule {}