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
exports.putHistorial = exports.getHistorial = void 0;
const prismaClient_1 = require("../config/prismaClient");
function getHistorial({ fecha, cedula }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { historial } = prismaClient_1.prismaClient;
        let parsedDate;
        if (fecha)
            parsedDate = new Date(fecha);
        if (!cedula)
            cedula = undefined;
        if (parsedDate === undefined && cedula === undefined)
            return [];
        else {
            const result = yield historial.findMany({
                where: {
                    fecha: parsedDate,
                    cedula
                }
            });
            return result;
        }
    });
}
exports.getHistorial = getHistorial;
const putHistorial = ({ id, entregado }) => __awaiter(void 0, void 0, void 0, function* () {
    const { historial } = prismaClient_1.prismaClient;
    let currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    if (entregado) {
        const result = yield historial.update({
            data: { entregado, fecha_entregado: currentDate },
            where: { id }
        });
        return result; // object
    }
});
exports.putHistorial = putHistorial;
console.log(1);
