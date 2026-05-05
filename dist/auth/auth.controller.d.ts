import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import { ResponseUserDto } from './dto/response-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    login(loginUserDto: LoginUserDto): Promise<ResponseTokenDto>;
}
