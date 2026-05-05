import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
  @Expose()
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID único del usuario',
  })
  id: string;

  @Expose()
  @ApiProperty({ example: 'john_doe', description: 'Nombre de usuario' })
  username: string;

  @Expose()
  @ApiProperty({
    example: 'john@example.com',
    description: 'Correo electrónico',
  })
  email: string;

  @Expose()
  @ApiProperty({ description: 'Fecha de creación de la cuenta' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;

  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
