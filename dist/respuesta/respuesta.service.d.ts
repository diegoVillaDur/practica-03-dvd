import { Repository } from 'typeorm';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { ResponseRespuestaDto } from './dto/response-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';
import { Respuesta } from './entities/respuesta.entity';
export declare class RespuestaService {
    private readonly respuestaRepository;
    constructor(respuestaRepository: Repository<Respuesta>);
    create(createRespuestaDto: CreateRespuestaDto): Promise<ResponseRespuestaDto>;
    findAll(): Promise<ResponseRespuestaDto[]>;
    findOne(id: string): Promise<ResponseRespuestaDto>;
    update(id: string, updateRespuestaDto: UpdateRespuestaDto): Promise<ResponseRespuestaDto>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
