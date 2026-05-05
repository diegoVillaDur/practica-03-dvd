export declare class ResponseRespuestaDto {
    id: string;
    contenidoRespuesta: string;
    correcta: boolean;
    anotacion?: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<ResponseRespuestaDto>);
}
