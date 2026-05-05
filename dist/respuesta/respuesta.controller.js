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
exports.RespuestaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_respuesta_dto_1 = require("./dto/create-respuesta.dto");
const response_respuesta_dto_1 = require("./dto/response-respuesta.dto");
const update_respuesta_dto_1 = require("./dto/update-respuesta.dto");
const respuesta_service_1 = require("./respuesta.service");
let RespuestaController = class RespuestaController {
    constructor(respuestaService) {
        this.respuestaService = respuestaService;
    }
    findAll() {
        return this.respuestaService.findAll();
    }
    findOne(id) {
        return this.respuestaService.findOne(id);
    }
    create(createRespuestaDto) {
        return this.respuestaService.create(createRespuestaDto);
    }
    update(id, updateRespuestaDto) {
        return this.respuestaService.update(id, updateRespuestaDto);
    }
    remove(id) {
        return this.respuestaService.remove(id);
    }
};
exports.RespuestaController = RespuestaController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener todas las respuestas',
        description: 'Retorna la lista completa de respuestas de examen ordenadas por fecha de creación (más reciente primero). Ruta pública.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Lista de respuestas obtenida exitosamente',
        type: [response_respuesta_dto_1.ResponseRespuestaDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RespuestaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener una respuesta por ID',
        description: 'Busca y retorna una respuesta específica por su UUID. Ruta pública.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID de la respuesta',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        type: 'string',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta encontrada exitosamente',
        type: response_respuesta_dto_1.ResponseRespuestaDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Respuesta no encontrada con el ID proporcionado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RespuestaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear una nueva respuesta',
        description: 'Ruta protegida. Requiere token JWT válido en el header Authorization. ' +
            'Crea un nuevo registro de respuesta de examen.',
    }),
    (0, swagger_1.ApiBody)({ type: create_respuesta_dto_1.CreateRespuestaDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Respuesta creada exitosamente',
        type: response_respuesta_dto_1.ResponseRespuestaDto,
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'No autorizado. Token JWT inválido, expirado o ausente.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_respuesta_dto_1.CreateRespuestaDto]),
    __metadata("design:returntype", Promise)
], RespuestaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar parcialmente una respuesta',
        description: 'Ruta protegida. Requiere token JWT válido. ' +
            'Actualiza solo los campos proporcionados (PATCH semántico).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID de la respuesta a actualizar',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        type: 'string',
    }),
    (0, swagger_1.ApiBody)({ type: update_respuesta_dto_1.UpdateRespuestaDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta actualizada exitosamente',
        type: response_respuesta_dto_1.ResponseRespuestaDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Respuesta no encontrada' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token JWT inválido o ausente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_respuesta_dto_1.UpdateRespuestaDto]),
    __metadata("design:returntype", Promise)
], RespuestaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar una respuesta',
        description: 'Ruta protegida. Requiere token JWT válido. ' +
            'Elimina permanentemente una respuesta por su UUID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'UUID de la respuesta a eliminar',
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        type: 'string',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta eliminada exitosamente',
        schema: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Respuesta "a1b2c3d4-..." eliminada exitosamente',
                },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Respuesta no encontrada' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token JWT inválido o ausente' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'No tiene permisos para esta acción' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RespuestaController.prototype, "remove", null);
exports.RespuestaController = RespuestaController = __decorate([
    (0, swagger_1.ApiTags)('Respuesta'),
    (0, common_1.Controller)('respuesta'),
    __metadata("design:paramtypes", [respuesta_service_1.RespuestaService])
], RespuestaController);
//# sourceMappingURL=respuesta.controller.js.map