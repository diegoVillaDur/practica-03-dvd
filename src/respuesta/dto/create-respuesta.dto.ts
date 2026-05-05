import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, } from 'class-validator';

export class CreateRespuestaDto {
  @ApiProperty({
    example: 'La fotosíntesis convierte luz solar en energía química.',
    description: 'Contenido de la respuesta al examen (3 - 1000 caracteres)',
    minLength: 3,
    maxLength: 1000,
  })
  @IsString({ message: 'El contenido de la respuesta debe ser texto' })
  @IsNotEmpty({ message: 'El contenido de la respuesta es obligatorio' })
  @MinLength(3, {
    message: 'El contenido de la respuesta debe tener al menos 3 caracteres',
  })
  @MaxLength(1000, {
    message: 'El contenido de la respuesta no puede exceder 1000 caracteres',
  })
  contenidoRespuesta: string;

  @ApiProperty({
    example: true,
    description:
      'Indica si la respuesta es correcta (true) o incorrecta (false)',
  })
  @IsBoolean({ message: 'El campo "correcta" debe ser un valor booleano' })
  @IsNotEmpty({ message: 'El campo "correcta" es obligatorio' })
  correcta: boolean;

  @ApiPropertyOptional({
    example: 'Buena respuesta, pero faltó mencionar el ciclo de Calvin.',
    description:
      'Anotación o comentario opcional del evaluador (máx. 500 caracteres)',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La anotación debe ser texto' })
  @MaxLength(500, { message: 'La anotación no puede exceder 500 caracteres' })
  anotacion?: string;
}
