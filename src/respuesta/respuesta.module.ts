import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaController } from './respuesta.controller';
import { RespuestaService } from './respuesta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Respuesta])],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}
