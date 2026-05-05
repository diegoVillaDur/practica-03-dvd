import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { ResponseRespuestaDto } from './dto/response-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { RespuestaService } from './respuesta.service';
export declare class RespuestaController {
    private readonly respuestaService;
    constructor(respuestaService: RespuestaService);
    findAll(): Promise<ResponseRespuestaDto[]>;
    findOne(id: string): Promise<ResponseRespuestaDto>;
    create(createRespuestaDto: CreateRespuestaDto): Promise<ResponseRespuestaDto>;
    update(id: string, updateRespuestaDto: UpdateRespuestaDto): Promise<ResponseRespuestaDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
