import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('respuestas')
export class Respuesta {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID único de la respuesta (UUID v4)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'La fotosíntesis es el proceso por el cual las plantas producen su alimento.',
    description: 'Texto de la respuesta al examen',
    minLength: 3,
    maxLength: 1000,
  })
  @Column({ length: 1000 })
  contenidoRespuesta: string;

  @ApiProperty({
    example: true,
    description: 'Indica si la respuesta es correcta (true) o incorrecta (false)',
  })
  @Column({ default: false })
  correcta: boolean;

  @ApiPropertyOptional({
    example: 'Respuesta parcialmente correcta, falta mencionar la clorofila.',
    description: 'Anotación o comentario opcional sobre la respuesta',
    maxLength: 500,
  })
  @Column({ length: 500, nullable: true })
  anotacion?: string;

  @ApiProperty({ description: 'Fecha de creación del registro' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización del registro' })
  @UpdateDateColumn()
  updatedAt: Date;
}
