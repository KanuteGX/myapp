import { historial } from '@prisma/client';
import { prismaClient } from '../config/prismaClient';

// Algoritmo de GET - Form

type getHistorialFormParams = { cedula?: string; Nombre?: string; fecha?: string; entregado ?: string };

async function getHistorialForm({ cedula, Nombre, fecha, entregado }: getHistorialFormParams): Promise<historial[]> {
	const { historial } = prismaClient;

	if (!cedula) cedula = undefined;

	if (!Nombre) Nombre = undefined;

	let parsedDate: undefined | Date;
	let parsedDateMax: undefined | Date;

	if (fecha) {
		parsedDate = new Date(fecha);

		// composicion de la fecha para que se entienda la extraccion de string - 2022-01-01

		if (parseInt(fecha.slice(5, 7)) === 12) parsedDateMax = new Date(`${parseInt(fecha.slice(0, 4)) + 1}-01-01`);
		else parsedDateMax = new Date(`${fecha.slice(0, 4)}-${parseInt(fecha.slice(5, 7)) + 1}-01`);
	}

	let parsedBoolean :boolean | undefined;

if (entregado === 'false') parsedBoolean = undefined
else parsedBoolean = Boolean(entregado)


	if (cedula === undefined && Nombre === undefined && parsedDate === undefined && parsedBoolean === undefined) return [];
	else {
		const result = await historial.findMany({
			where: {
				cedula,
				Nombre: {
					contains: Nombre,
					mode: 'insensitive'
				},
				AND: [
					{
						fecha: { gte: parsedDate }
					},
					{
						fecha: { lt: parsedDateMax }
					}
				],
				entregado : parsedBoolean
			}
		});
		return result;
	}
}

export { getHistorialForm };

// Algoritmo de PUT - Check

type putHistorialCheckParams = { id: number; data: boolean };

const putHistorialCheck = async ({ id, data }: putHistorialCheckParams): Promise<any> => {
	const { historial } = prismaClient;

	const currentDate: Date = new Date();

	if (data) {
		const result = await historial.update({
			data: { entregado: data, fecha_entregado: currentDate },
			where: { id }
		});
		return result; // object
	}
};

export { putHistorialCheck };

// Algoritmo de PUT - Description

type putHistorialDescripParams = { id: number; data?: string };

const putHistorialDescrip = async ({ id, data }: putHistorialDescripParams): Promise<any> => {
	const { historial } = prismaClient;

	data = data?.trim();

	if (data) {
		const result = await historial.update({
			data: { descripcion: data },
			where: { id }
		});
		return result; // object
	}
};

export { putHistorialDescrip };
