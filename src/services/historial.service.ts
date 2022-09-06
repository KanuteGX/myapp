import { prismaClient } from '../config/prismaClient';

// Algoritmo de GET

type getHistorialParams = { fecha?: string; cedula?: string };

async function getHistorial({ fecha, cedula }: getHistorialParams): Promise<any> {
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

const putHistorial = async ({ id, entregado }: putHistorialParams): Promise<void> => {
	const { historial } = prismaClient;

	let fecha_entregado = null;

	await historial.update({
		where: { id },
		data: { entregado, fecha_entregado }
	});
};

export { putHistorial };
