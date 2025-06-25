import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

const parseCsv = (filePath: string): Promise<any[]> =>
  new Promise((resolve, reject) => {
    const rows: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });

const parseCustomDate = (input: string): Date | null => {
  const match = input.match(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2})$/);
  if (!match) return null;
  const [, day, month, year, hour, minute, second] = match;
  const isoString = `${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:${second}`;
  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
};

async function main() {
  const basePath = path.join(__dirname, '..', 'data');

  // 清空旧数据
  await prisma.measurement.deleteMany();
  await prisma.variable.deleteMany();
  await prisma.weatherStation.deleteMany();

  // 插入站点信息
  const stations = await parseCsv(path.join(basePath, 'weather_stations.csv'));
  for (const s of stations) {
    await prisma.weatherStation.create({
      data: {
        id: Number(s.id),
        name: s.ws_name || s.Name || s.name || 'Unknown Station',
        site: s.site,
        portfolio: s.portfolio,
        state: s.state,
        latitude: parseFloat(s.latitude),
        longitude: parseFloat(s.longitude),
      },
    });
  }
  console.log('✅ Weather stations imported');

  // 插入变量
  const variables = await parseCsv(path.join(basePath, 'variables.csv'));
  for (const v of variables) {
    await prisma.variable.create({
      data: {
        var_id: Number(v.var_id),
        name: v.name,
        long_name: v.long_name,
        unit: v.unit,
        stationId: Number(v.id),
      },
    });
  }
  console.log('✅ Variables imported');

  // 遍历每个 data_*.csv 文件，提取每列变量，匹配变量 ID 后插入测量值
  const stationFiles = fs.readdirSync(basePath).filter(f => f.startsWith('data_') && f.endsWith('.csv'));

  for (const fileName of stationFiles) {
    const stationId = Number(fileName.replace('data_', '').replace('.csv', ''));
    const filePath = path.join(basePath, fileName);

    const rows = await parseCsv(filePath);
    if (rows.length === 0) {
      console.warn(`⛔ No rows in ${fileName}`);
      continue;
    }

    const variableNames = Object.keys(rows[0]).filter((key) => key.toLowerCase() !== 'timestamp');

    for (const variableName of variableNames) {
      const variable = await prisma.variable.findFirst({
        where: {
          stationId,
          name: variableName,
        },
      });

      if (!variable) {
        console.warn(`⚠️ Variable "${variableName}" not found for station ${stationId}, skipped`);
        continue;
      }

      const measurements = rows
        .map((r) => {
          const date = parseCustomDate(r.timestamp);
          const value = parseFloat(r[variableName]);
          if (!date || isNaN(value)) return null;
          return {
            timestamp: date,
            value,
            variableId: variable.id,
          };
        })
        .filter((m) => m !== null);

      if (measurements.length > 0) {
        await prisma.measurement.createMany({ data: measurements as any[] });
        console.log(`📌 Imported ${measurements.length} "${variableName}" rows from ${fileName}`);
      } else {
        console.warn(`⛔ No valid "${variableName}" data in ${fileName}`);
      }
    }
  }

  console.log('🎉 Seeding complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());