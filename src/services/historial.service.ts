import { historial } from "@prisma/client";
import { prismaClient } from "../config/prismaClient";

type getHistorialParams = { fecha?: string, cedula?: string }

async function getHistorial({ fecha, cedula }: getHistorialParams): Promise<historial[]> {
    
    const { historial } = prismaClient
    let parsedDate: undefined | Date
    if(fecha) {
        parsedDate = new Date(fecha)
    }
    const result = await historial.findMany({
        where: {
            fecha: parsedDate,
            cedula
        }
    })
    return result
}

export { getHistorial }