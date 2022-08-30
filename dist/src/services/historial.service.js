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
exports.getHistorial = void 0;
const prismaClient_1 = require("../config/prismaClient");
function getHistorial({ fecha, cedula }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { historial } = prismaClient_1.prismaClient;
        let parsedDate;
        if (fecha) {
            parsedDate = new Date(fecha);
        }
        const result = yield historial.findMany({
            where: {
                fecha: parsedDate,
                cedula
            }
        });
        return result;
    });
}
exports.getHistorial = getHistorial;
