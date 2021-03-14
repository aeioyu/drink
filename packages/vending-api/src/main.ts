import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryExceptionFilter } from './global/filters/query-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryExceptionFilter());
  app.enableCors();
  await app.listen(8001);
}
bootstrap();
