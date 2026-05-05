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
exports.CreateRespuestaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRespuestaDto {
}
exports.CreateRespuestaDto = CreateRespuestaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'La fotosíntesis convierte luz solar en energía química.',
        description: 'Contenido de la respuesta al examen (3 - 1000 caracteres)',
        minLength: 3,
        maxLength: 1000,
    }),
    (0, class_validator_1.IsString)({ message: 'El contenido de la respuesta debe ser texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El contenido de la respuesta es obligatorio' }),
    (0, class_validator_1.MinLength)(3, {
        message: 'El contenido de la respuesta debe tener al menos 3 caracteres',
    }),
    (0, class_validator_1.MaxLength)(1000, {
        message: 'El contenido de la respuesta no puede exceder 1000 caracteres',
    }),
    __metadata("design:type", String)
], CreateRespuestaDto.prototype, "contenidoRespuesta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indica si la respuesta es correcta (true) o incorrecta (false)',
    }),
    (0, class_validator_1.IsBoolean)({ message: 'El campo "correcta" debe ser un valor booleano' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El campo "correcta" es obligatorio' }),
    __metadata("design:type", Boolean)
], CreateRespuestaDto.prototype, "correcta", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Buena respuesta, pero faltó mencionar el ciclo de Calvin.',
        description: 'Anotación o comentario opcional del evaluador (máx. 500 caracteres)',
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La anotación debe ser texto' }),
    (0, class_validator_1.MaxLength)(500, { message: 'La anotación no puede exceder 500 caracteres' }),
    __metadata("design:type", String)
], CreateRespuestaDto.prototype, "anotacion", void 0);
//# sourceMappingURL=create-respuesta.dto.js.map