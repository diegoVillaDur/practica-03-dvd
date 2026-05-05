import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';


@Exclude()
export class ResponseRespuestaDto {
  @Expose()
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID único de la respuesta (UUID)',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'La fotosíntesis convierte luz solar en energía química.',
    description: 'Contenido de la respuesta',
  })
  contenidoRespuesta: string;

  @Expose()
  @ApiProperty({
    example: true,
    description: 'Indica si la respuesta es correcta o incorrecta',
  })
  correcta: boolean;

  @Expose()
  @ApiPropertyOptional({
    example: 'Buena respuesta, pero faltó mencionar el ciclo de Calvin.',
    description: 'Anotación del evaluador (opcional)',
    nullable: true,
  })
  anotacion?: string;

  @Expose()
  @ApiProperty({ description: 'Fecha de creación del registro' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'Fecha de última actualización del registro' })
  updatedAt: Date;

  constructor(partial: Partial<ResponseRespuestaDto>) {
    Object.assign(this, partial);
  }
}
