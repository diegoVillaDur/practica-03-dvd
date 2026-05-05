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
## Descripción

API REST construida con **NestJS**, **TypeORM** y **PostgreSQL** para gestionar respuestas de exámenes.

## Autenticación

Esta API usa **JWT Bearer Token**.

### Pasos para autenticarse:
1. **Registrar** un usuario en \`POST /auth/register\`
2. **Iniciar sesión** en \`POST /auth/login\` → obtendrás un \`access_token\`
3. Hacer clic en el botón **🔒 Authorize** e ingresar: \`Bearer <tu_token>\`
4. Las rutas marcadas con 🔒 ya estarán accesibles

## Rutas protegidas

| Método | Ruta | Protegida |
|--------|------|-----------|
| GET | /respuesta | ✅ Pública |
| GET | /respuesta/:id | ✅ Pública |
| POST | /respuesta | 🔒 JWT requerido |
| PATCH | /respuesta/:id | 🔒 JWT requerido |
| DELETE | /respuesta/:id | 🔒 JWT requerido |
      `,
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

  console.log(`\n🚀 Aplicación corriendo en: http://localhost:${port}`);
  console.log(`📋 Swagger UI disponible en: http://localhost:${port}/api\n`);
}

bootstrap();
