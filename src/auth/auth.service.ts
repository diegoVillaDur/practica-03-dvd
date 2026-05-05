import { ConflictException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcryptjs";
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * Registra un nuevo usuario con contrasena encriptada.
   * Retorna ResponseUserDto para no exponer la contraseña.
   */
  async register(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const { username, email, password } = createUserDto;

    // Verificar username unico
    const existingUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new ConflictException(
        `El nombre de usuario "${username}" ya está en uso`,
      );
    }

    // Verificar email unico
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException(
        `El correo "${email}" ya está registrado`,
      );
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // Retornar sin password
    return new ResponseUserDto({
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    });
  }

  /**
   * Autentica al usuario y devuelve un JWT.
   * Retorna ResponseTokenDto con el token y datos del usuario.
   */
  async login(loginUserDto: LoginUserDto): Promise<ResponseTokenDto> {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: expiresIn,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
