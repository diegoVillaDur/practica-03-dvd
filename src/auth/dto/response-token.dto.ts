import { ApiProperty } from '@nestjs/swagger';

export class ResponseTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT de acceso',
  })
  access_token: string;

  @ApiProperty({
    example: 'Bearer',
    description: 'Tipo de token',
    default: 'Bearer',
  })
  token_type: string;

  @ApiProperty({
    example: '1d',
    description: 'Tiempo de expiración del token',
  })
  expires_in: string;

  @ApiProperty({
    description: 'Datos básicos del usuario autenticado',
    example: {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      username: 'john_doe',
      email: 'john@example.com',
    },
  })
  user: {
    id: string;
    username: string;
    email: string;
  };
}
