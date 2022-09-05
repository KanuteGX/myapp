import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getHistorial } from './src/services/historial.service';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
	cors({
		origin: '*'
	})
);

app.get('/historial', async (req: Request, res: Response) => {
	const { cedula, fecha } = req.query as { cedula?: string; fecha?: string };

	console.log(req.query);

	const result = await getHistorial({
		cedula,
		fecha
	});
	res.json(result);
});

app.put('/entregados', (req: Request, res: Response) => {
	console.log('exito');
	res.send('carnet entregado');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
