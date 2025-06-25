import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StationFilterService {
    constructor(private readonly prisma: PrismaService) {}

    async filterByState(states: string[]) {
        const stations = await this.prisma.weatherStation.findMany(
            {
                where: {state: {
                    in: states,
                }},
                include: {
                    variables: {
                        include: {
                            measurements: {
                                orderBy: {timestamp: 'desc'},
                                take: 1,
                            },
                        },
                    },
                },
            },
        );

        return stations.map((station) => ({
                    id: station.id,
                    name: station.name,
                    site: station.site,
                    portfolio: station.portfolio,
                    state: station.state,
                    latitude: station.latitude,
                    longitude: station.longitude,
                    latestMeasurements: station.variables
                        .map((v) => {
                        const m = v.measurements[0];
                        if (!m) return null;
                        return {
                            variableName: v.long_name,
                            unit: v.unit,
                            value: m.value,
                            timestamp: m.timestamp,
                        };
                        })
                        .filter((x) => x !== null),
        }));
    }
}