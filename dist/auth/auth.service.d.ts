import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ResponseUserDto } from './dto/response-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly SALT_ROUNDS;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    login(loginUserDto: LoginUserDto): Promise<ResponseTokenDto>;
}
