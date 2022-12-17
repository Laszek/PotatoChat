import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connect } from './db/db';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  connect();
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Potato Chat API')
    .setDescription('Potato Chat API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5112);
}

bootstrap();
