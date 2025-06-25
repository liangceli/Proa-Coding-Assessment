import { Controller, Get, Query } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  async getAllStations() {
    return this.stationsService.getAllStationsWithLatestMeasurements();
  }
}
