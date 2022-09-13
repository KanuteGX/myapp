import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getHistorial, putHistorial } from './src/services/historial.service';
import cors from 'cors';

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT;

// CORS: permisos sobre que URLs pueden solicitar peticiones
app.use(
	cors({
		origin: '*'
	})
);

// installer npm body parse
app.use(
	express.urlencoded({
		extended: true
	})
);

// Peticion GET (Leer datos)

app.get('/historial', async (req: Request, res: Response) => {
	const { cedula, Nombre, fecha } = req.query as { cedula?: string; Nombre?: string; fecha?: string };

	const result = await getHistorial({ cedula, Nombre, fecha });
	res.json(result);
	console.log(req.query);
});

// Peticion PUT (Actualizar datos)

app.put('/entregados/:id', async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);

	const { entregado } = req.body as { entregado: boolean };

	const result = await putHistorial({ id, entregado });
	res.json(result);
	console.log(req.body, result);
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
