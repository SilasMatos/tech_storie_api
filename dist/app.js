"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
require("dotenv/config");
const Router_1 = require("./routes/Router");
const cors_1 = __importDefault(require("@fastify/cors"));
const database_1 = require("./configs/database");
class App {
    constructor() {
        this.server = (0, fastify_1.default)();
        this.server.register(cors_1.default, {
            origin: ['http://localhost:5173', 'http://localhost:3001']
        });
        this.routes();
        this.connectToDb();
    }
    routes() {
        this.server.get('/', this.index);
        new Router_1.MainRoutes(this.server);
    }
    async index(request, reply) {
        reply.send({ message: 'Seja, bem vindo' });
    }
    async connectToDb() {
        await (0, database_1.connectToDb)();
    }
    start() {
        const port = process.env.PORT || 3000;
        this.server.listen({
            port: Number(port),
            host: '0.0.0.0'
        }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server is running on ${address} ✅`);
        });
    }
}
const app = new App();
app.start();
