"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
        reply.status(401).send({ msg: 'Acesso negado!' });
        return;
    }
    try {
        const secret = process.env.SECRET;
        if (!secret) {
            throw new Error('SECRET não definido no arquivo .env');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        request.user = decoded;
    }
    catch (err) {
        reply.status(400).send({ msg: 'Token inválido!' });
    }
};
exports.authMiddleware = authMiddleware;
