"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const historial_service_1 = require("./src/services/historial.service");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
// CORS: permisos sobre que URLs pueden solicitar peticiones
app.use((0, cors_1.default)({
    origin: '*'
}));
// installer npm body parse
app.use(express_1.default.urlencoded({
    extended: true
}));
// Peticion GET Form (Leer datos)
app.get('/historial', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula, Nombre, fecha, entregado, userViews } = req.query;
    const result = yield (0, historial_service_1.getHistorialForm)({ cedula, Nombre, fecha, entregado, userViews });
    res.json(result);
    console.log(req.query, result[1]);
}));
// Peticion PUT Check - fecha entregado and entregado (Actualizar datos)
app.put('/entregados/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { data } = req.body;
    const result = yield (0, historial_service_1.putHistorialCheck)({ id, data });
    res.json(result);
    console.log(req.body, result);
}));
// Peticion PUT Description (Actualizar datos)
app.put('/descripciones/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { data } = req.body;
    const result = yield (0, historial_service_1.putHistorialDescrip)({ id, data });
    res.json(result);
    console.log(req.body, result);
}));
// Peticion - DELETE User
app.delete('/eliminados/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const result = yield (0, historial_service_1.deleteUser)(id);
    res.json(result);
    console.log(result);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
