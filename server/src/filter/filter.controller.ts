import { Controller, Get, Query } from '@nestjs/common';
import { StationFilterService } from './filter.service';

@Controller('filter')
export class StationFilterController {
    constructor(private readonly filterService: StationFilterService) {}

    @Get()
    async filterByState(@Query('state') state: string)  {
        return this.filterService.filterByState(state);
    }
}