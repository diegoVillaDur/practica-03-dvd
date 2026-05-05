import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { ResponseRespuestaDto } from './dto/response-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { RespuestaService } from './respuesta.service';

@ApiTags('Respuesta')
@Controller('respuesta')
export class RespuestaController {
  constructor(private readonly respuestaService: RespuestaService) { }

  // RUTAS PÚBLICAS (sin JWT)
  @Get()
  @ApiOperation({
    summary: 'Obtener todas las respuestas',
    description:
      'Retorna la lista completa de respuestas de examen ordenadas por fecha de creación (más reciente primero). Ruta pública.',
  })
  @ApiOkResponse({
    description: 'Lista de respuestas obtenida exitosamente',
    type: [ResponseRespuestaDto],
  })
  findAll(): Promise<ResponseRespuestaDto[]> {
    return this.respuestaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una respuesta por ID',
    description:
      'Busca y retorna una respuesta específica por su UUID. Ruta pública.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la respuesta',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Respuesta encontrada exitosamente',
    type: ResponseRespuestaDto,
  })
  @ApiNotFoundResponse({
    description: 'Respuesta no encontrada con el ID proporcionado',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseRespuestaDto> {
    return this.respuestaService.findOne(id);
  }


  // RUTAS PROTEGIDAS (requieren JWT)

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Crear una nueva respuesta',
    description:
      'Ruta protegida. Requiere token JWT válido en el header Authorization. ' +
      'Crea un nuevo registro de respuesta de examen.',
  })
  @ApiBody({ type: CreateRespuestaDto })
  @ApiCreatedResponse({
    description: 'Respuesta creada exitosamente',
    type: ResponseRespuestaDto,
  })
  @ApiUnauthorizedResponse({
    description: 'No autorizado. Token JWT inválido, expirado o ausente.',
  })
  create(
    @Body() createRespuestaDto: CreateRespuestaDto,
  ): Promise<ResponseRespuestaDto> {
    return this.respuestaService.create(createRespuestaDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Actualizar parcialmente una respuesta',
    description:
      'Ruta protegida. Requiere token JWT válido. ' +
      'Actualiza solo los campos proporcionados (PATCH semántico).',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la respuesta a actualizar',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'string',
  })
  @ApiBody({ type: UpdateRespuestaDto })
  @ApiOkResponse({
    description: 'Respuesta actualizada exitosamente',
    type: ResponseRespuestaDto,
  })
  @ApiNotFoundResponse({ description: 'Respuesta no encontrada' })
  @ApiUnauthorizedResponse({ description: 'Token JWT inválido o ausente' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRespuestaDto: UpdateRespuestaDto,
  ): Promise<ResponseRespuestaDto> {
    return this.respuestaService.update(id, updateRespuestaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Eliminar una respuesta',
    description:
      'Ruta protegida. Requiere token JWT válido. ' +
      'Elimina permanentemente una respuesta por su UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la respuesta a eliminar',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    type: 'string',
  })
  @ApiOkResponse({
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
  })
  @ApiNotFoundResponse({ description: 'Respuesta no encontrada' })
  @ApiUnauthorizedResponse({ description: 'Token JWT inválido o ausente' })
  @ApiForbiddenResponse({ description: 'No tiene permisos para esta acción' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.respuestaService.remove(id);
  }
}
