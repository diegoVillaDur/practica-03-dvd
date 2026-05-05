"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API REST - Respuestas de Examen')
        .setDescription(`
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
      `)
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Ingresa tu JWT token. Ejemplo: Bearer eyJhbGci...',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Auth', 'Registro y autenticación de usuarios')
        .addTag('Respuesta', 'CRUD de respuestas de examen')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
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
//# sourceMappingURL=main.js.map