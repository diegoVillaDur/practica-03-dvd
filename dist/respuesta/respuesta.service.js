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
exports.RespuestaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const response_respuesta_dto_1 = require("./dto/response-respuesta.dto");
const respuesta_entity_1 = require("./entities/respuesta.entity");
let RespuestaService = class RespuestaService {
    constructor(respuestaRepository) {
        this.respuestaRepository = respuestaRepository;
    }
    async create(createRespuestaDto) {
        const respuesta = this.respuestaRepository.create(createRespuestaDto);
        const saved = await this.respuestaRepository.save(respuesta);
        return new response_respuesta_dto_1.ResponseRespuestaDto(saved);
    }
    async findAll() {
        const respuestas = await this.respuestaRepository.find({
            order: { createdAt: 'DESC' },
        });
        return respuestas.map((r) => new response_respuesta_dto_1.ResponseRespuestaDto(r));
    }
    async findOne(id) {
        const respuesta = await this.respuestaRepository.findOne({
            where: { id },
        });
        if (!respuesta) {
            throw new common_1.NotFoundException(`Respuesta con ID "${id}" no encontrada`);
        }
        return new response_respuesta_dto_1.ResponseRespuestaDto(respuesta);
    }
    async update(id, updateRespuestaDto) {
        const respuesta = await this.respuestaRepository.findOne({
            where: { id },
        });
        if (!respuesta) {
            throw new common_1.NotFoundException(`Respuesta con ID "${id}" no encontrada`);
        }
        const updated = await this.respuestaRepository.save({
            ...respuesta,
            ...updateRespuestaDto,
        });
        return new response_respuesta_dto_1.ResponseRespuestaDto(updated);
    }
    async remove(id) {
        const respuesta = await this.respuestaRepository.findOne({
            where: { id },
        });
        if (!respuesta) {
            throw new common_1.NotFoundException(`Respuesta con ID "${id}" no encontrada`);
        }
        await this.respuestaRepository.remove(respuesta);
        return { message: `Respuesta "${id}" eliminada exitosamente` };
    }
};
exports.RespuestaService = RespuestaService;
exports.RespuestaService = RespuestaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(respuesta_entity_1.Respuesta)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RespuestaService);
//# sourceMappingURL=respuesta.service.js.map