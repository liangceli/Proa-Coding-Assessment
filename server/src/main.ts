import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow all incoming resource allow me to access Mapbox
  app.enableCors();
  await app.listen(3001); 
}
bootstrap();
