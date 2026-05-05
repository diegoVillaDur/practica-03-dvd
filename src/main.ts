import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API REST - Respuestas de Examen')
    .setDescription(
      `
## Practca 03 Diego Villa Duran 4IM2

### Entidad: Respuesta`
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Ingresa tu JWT token. Ejemplo: Bearer eyJhbGci...',
        in: 'header',
      },
      'JWT-auth', // Este nombre debe coincidir con @ApiBearerAuth('JWT-auth')
    )
    .addTag('Auth', 'Registro y autenticación de usuarios')
    .addTag('Respuesta', 'CRUD de respuestas de examen')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantiene el token entre recargas
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'API Respuestas - Docs',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
