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
Object.defineProperty(exports, "__esModule", { value: true });
exports.putHistorialDescrip = exports.putHistorialCheck = exports.getHistorialForm = void 0;
const prismaClient_1 = require("../config/prismaClient");
function getHistorialForm({ cedula, Nombre, fecha }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { historial } = prismaClient_1.prismaClient;
        if (!cedula)
            cedula = undefined;
        if (!Nombre)
            Nombre = undefined;
        let parsedDate;
        let parsedDateMax;
        if (fecha) {
            parsedDate = new Date(fecha);
            // composicion de la fecha para que se entienda la extraccion de string - 2022-01-01
            if (parseInt(fecha.slice(5, 7)) === 12)
                parsedDateMax = new Date(`${parseInt(fecha.slice(0, 4)) + 1}-01-01`);
            else
                parsedDateMax = new Date(`${fecha.slice(0, 4)}-${parseInt(fecha.slice(5, 7)) + 1}-01`);
        }
        if (cedula === undefined && Nombre === undefined && parsedDate === undefined)
            return [];
        else {
            const result = yield historial.findMany({
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
                    ]
                }
            });
            return result;
        }
    });
}
exports.getHistorialForm = getHistorialForm;
const putHistorialCheck = ({ id, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const { historial } = prismaClient_1.prismaClient;
    const currentDate = new Date();
    if (data) {
        const result = yield historial.update({
            data: { entregado: data, fecha_entregado: currentDate },
            where: { id }
        });
        return result; // object
    }
});
exports.putHistorialCheck = putHistorialCheck;
const putHistorialDescrip = ({ id, data }) => __awaiter(void 0, void 0, void 0, function* () {
    const { historial } = prismaClient_1.prismaClient;
    data = data === null || data === void 0 ? void 0 : data.trim();
    if (data) {
        const result = yield historial.update({
            data: { descripcion: data },
            where: { id }
        });
        return result; // object
    }
});
exports.putHistorialDescrip = putHistorialDescrip;
