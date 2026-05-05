"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const response_user_dto_1 = require("./dto/response-user.dto");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.SALT_ROUNDS = 10;
    }
    async register(createUserDto) {
        const { username, email, password } = createUserDto;
        const existingUsername = await this.userRepository.findOne({
            where: { username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException(`El nombre de usuario "${username}" ya está en uso`);
        }
        const existingEmail = await this.userRepository.findOne({
            where: { email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException(`El correo "${email}" ya está registrado`);
        }
        const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
        const user = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        return new response_user_dto_1.ResponseUserDto({
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        });
    }
    async login(loginUserDto) {
        const { username, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map