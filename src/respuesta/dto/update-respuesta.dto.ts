import { PartialType } from '@nestjs/swagger';
import { CreateRespuestaDto } from './create-respuesta.dto';

/**
 * DTO para actualización parcial de Respuesta.
 * Hereda todas las propiedades y validaciones de CreateRespuestaDto,
 * pero las hace opcionales (PATCH semántic).
 */
export class UpdateRespuestaDto extends PartialType(CreateRespuestaDto) {}
