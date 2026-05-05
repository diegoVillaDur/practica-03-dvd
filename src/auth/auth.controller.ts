import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Registro de nuevo usuario
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar nuevo usuario',
    description:
      'Crea una cuenta nueva. La contraseña se almacena encriptada con bcrypt. ' +
      'No se devuelven datos sensibles (contraseña) en la respuesta.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Usuario registrado exitosamente',
    type: ResponseUserDto,
  })
  @ApiConflictResponse({
    description: 'El username o email ya están en uso',
  })
  register(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.authService.register(createUserDto);
  }

  /**
   * Login de usuario
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica al usuario y devuelve un JWT Bearer Token. ' +
      'Incluir el token en el header "Authorization: Bearer <token>" para acceder a rutas protegidas.',
  })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({
    description: 'Login exitoso. Devuelve el token JWT y datos del usuario.',
    type: ResponseTokenDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas (username o contraseña incorrectos)',
  })
  login(@Body() loginUserDto: LoginUserDto): Promise<ResponseTokenDto> {
    return this.authService.login(loginUserDto);
  }
}
