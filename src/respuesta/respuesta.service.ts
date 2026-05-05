import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { ResponseRespuestaDto } from './dto/response-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';

@Injectable()
export class RespuestaService {
  constructor(
    @InjectRepository(Respuesta)
    private readonly respuestaRepository: Repository<Respuesta>,
  ) { }


  // Crea una nueva respuesta de examen

  async create(
    createRespuestaDto: CreateRespuestaDto,
  ): Promise<ResponseRespuestaDto> {
    const respuesta = this.respuestaRepository.create(createRespuestaDto);
    const saved = await this.respuestaRepository.save(respuesta);
    return new ResponseRespuestaDto(saved);
  }


  // Obtiene todas las respuestas

  async findAll(): Promise<ResponseRespuestaDto[]> {
    const respuestas = await this.respuestaRepository.find({
      order: { createdAt: 'DESC' },
    });
    return respuestas.map((r) => new ResponseRespuestaDto(r));
  }

  // Obtiene una respuesta por su ID (UUID)

  async findOne(id: string): Promise<ResponseRespuestaDto> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id },
    });

    if (!respuesta) {
      throw new NotFoundException(
        `Respuesta con ID "${id}" no encontrada`,
      );
    }

    return new ResponseRespuestaDto(respuesta);
  }

  // Actualiza parcialmente una respuesta por ID
  async update(
    id: string,
    updateRespuestaDto: UpdateRespuestaDto,
  ): Promise<ResponseRespuestaDto> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id },
    });

    if (!respuesta) {
      throw new NotFoundException(
        `Respuesta con ID "${id}" no encontrada`,
      );
    }

    const updated = await this.respuestaRepository.save({
      ...respuesta,
      ...updateRespuestaDto,
    });

    return new ResponseRespuestaDto(updated);
  }

  //Elimina una respuesta por ID
  async remove(id: string): Promise<{ message: string }> {
    const respuesta = await this.respuestaRepository.findOne({
      where: { id },
    });

    if (!respuesta) {
      throw new NotFoundException(
        `Respuesta con ID "${id}" no encontrada`,
      );
    }

    await this.respuestaRepository.remove(respuesta);

    return { message: `Respuesta "${id}" eliminada exitosamente` };
  }
}
