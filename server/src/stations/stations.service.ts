import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllStationsWithLatestMeasurements() {
    const stations = await this.prisma.weatherStation.findMany({
      include: {
        variables: {
          include: {
            measurements: {
              orderBy: {
                timestamp: 'desc',
              },
              take: 1, // Every variable just grab one information
            },
          },
        },
      },
    });

    return stations.map((station) => ({
      id: station.id,
      name: station.name,
      site: station.site,
      portfolio: station.portfolio,
      state: station.state,
      latitude: station.latitude,
      longitude: station.longitude,
      latestMeasurements: station.variables
        .map((variable) => {
          const latest = variable.measurements[0];
          console.log(latest);
          
          if (!latest) return null;
          return {
            variableName: variable.long_name,
            unit: variable.unit,
            value: latest.value, 
            timestamp: latest.timestamp,
          };
        })
        .filter((item) => item !== null),
    }));
  }
}
