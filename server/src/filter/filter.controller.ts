import { Controller, Get, Query } from '@nestjs/common';
import { StationFilterService } from './filter.service';

@Controller('filter')
export class StationFilterController {
    constructor(private readonly filterService: StationFilterService) {}

    @Get('by-state')
    async filterByState(@Query('states') states: string[] | string)  {
        const stateArray = Array.isArray(states) ? states : [states];
        return this.filterService.filterByState(stateArray);
    }
}