import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const PORT = config.get<number>('API_PORT');

  await app.listen(PORT || 3003, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
  });
}
start();
