import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 创建NestFactory的实例，并将根Module作为参数传递进去
  await app.listen(3000);
}
bootstrap();
