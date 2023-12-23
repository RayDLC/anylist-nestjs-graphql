import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpInterceptor } from './common/interceptors/http.interceptor';

async function bootstrap() {

  const { PORT, APP_NAME } = process.env
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
    .useGlobalInterceptors(new HttpInterceptor());
  
  await app.listen(PORT || 3000);
}
bootstrap();
