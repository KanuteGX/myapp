import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getHistorialForm, putHistorialCheck, putHistorialDescrip } from './src/services/historial.service';
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

// Peticion GET Form (Leer datos)

app.get('/historial', async (req: Request, res: Response) => {
	const { cedula, Nombre, fecha } = req.query as { cedula?: string; Nombre?: string; fecha?: string };

	const result = await getHistorialForm({ cedula, Nombre, fecha });
	res.json(result);
	console.log(req.query);
});

// Peticion PUT Check - fecha entregado and entregado (Actualizar datos)

app.put('/entregados/:id', async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);

	const { data } = req.body as { data: boolean };

	const result = await putHistorialCheck({ id, data });
	res.json(result);
	console.log(req.body, result);
});

// Peticion PUT Check - fecha entregado and entregado (Actualizar datos)

app.put('/descripciones/:id', async (req: Request, res: Response) => {
	const id: number = parseInt(req.params.id);

	const { data } = req.body as { data?: string };

	const result = await putHistorialDescrip({ id, data });
	res.json(result);
	console.log(req.body, result);
});

// Peticion PUT Description (Actualizar datos)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
