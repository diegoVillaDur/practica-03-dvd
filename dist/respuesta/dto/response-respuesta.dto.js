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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
let ResponseRespuestaDto = class ResponseRespuestaDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
exports.ResponseRespuestaDto = ResponseRespuestaDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        description: 'ID único de la respuesta (UUID)',
    }),
    __metadata("design:type", String)
], ResponseRespuestaDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        example: 'La fotosíntesis convierte luz solar en energía química.',
        description: 'Contenido de la respuesta',
    }),
    __metadata("design:type", String)
], ResponseRespuestaDto.prototype, "contenidoRespuesta", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la respuesta es correcta o incorrecta',
    }),
    __metadata("design:type", Boolean)
], ResponseRespuestaDto.prototype, "correcta", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Buena respuesta, pero faltó mencionar el ciclo de Calvin.',
        description: 'Anotación del evaluador (opcional)',
        nullable: true,
    }),
    __metadata("design:type", String)
], ResponseRespuestaDto.prototype, "anotacion", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación del registro' }),
    __metadata("design:type", Date)
], ResponseRespuestaDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización del registro' }),
    __metadata("design:type", Date)
], ResponseRespuestaDto.prototype, "updatedAt", void 0);
exports.ResponseRespuestaDto = ResponseRespuestaDto = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], ResponseRespuestaDto);
//# sourceMappingURL=response-respuesta.dto.js.map