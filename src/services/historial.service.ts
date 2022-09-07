import { historial } from '@prisma/client';
import { prismaClient } from '../config/prismaClient';

// Algoritmo de GET

type getHistorialParams = { fecha?: string; cedula?: string };

async function getHistorial({ fecha, cedula }: getHistorialParams): Promise<historial[]> {
	const { historial } = prismaClient;
	let parsedDate: undefined | Date;

	if (fecha) parsedDate = new Date(fecha);
	if (!cedula) cedula = undefined;

	if (parsedDate === undefined && cedula === undefined) return [];
	else {
		const result = await historial.findMany({
			where: {
				fecha: parsedDate,
				cedula
			}
		});
		return result;
	}
}

export { getHistorial };

// Algoritmo de PUT

type putHistorialParams = { id: number; entregado: boolean };

const putHistorial = async ({ id, entregado }: putHistorialParams): Promise<any> => {
	const { historial } = prismaClient;

	let currentDate: Date = new Date();

	currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

	if (entregado) {
		const result = await historial.update({
			data: { entregado, fecha_entregado: currentDate },
			where: { id }
		});
		return result; // object
	}
};

export { putHistorial };
