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
exports.Respuesta = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Respuesta = class Respuesta {
};
exports.Respuesta = Respuesta;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        description: 'ID único de la respuesta (UUID v4)',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Respuesta.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'La fotosíntesis es el proceso por el cual las plantas producen su alimento.',
        description: 'Texto de la respuesta al examen',
        minLength: 3,
        maxLength: 1000,
    }),
    (0, typeorm_1.Column)({ length: 1000 }),
    __metadata("design:type", String)
], Respuesta.prototype, "contenidoRespuesta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la respuesta es correcta (true) o incorrecta (false)',
    }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Respuesta.prototype, "correcta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Respuesta parcialmente correcta, falta mencionar la clorofila.',
        description: 'Anotación o comentario opcional sobre la respuesta',
        maxLength: 500,
    }),
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Respuesta.prototype, "anotacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación del registro' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Respuesta.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización del registro' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Respuesta.prototype, "updatedAt", void 0);
exports.Respuesta = Respuesta = __decorate([
    (0, typeorm_1.Entity)('respuestas')
], Respuesta);
//# sourceMappingURL=respuesta.entity.js.map