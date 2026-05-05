import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Respuesta } from './respuesta/entities/respuesta.entity';
import { RespuestaModule } from './respuesta/respuesta.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'respuesta_db',
      entities: [User, Respuesta],
      synchronize: true, // Solo para desarrollo. En producción usar migraciones.
      logging: false,
    }),

    AuthModule,
    RespuestaModule,
  ],
})
export class AppModule { }
