"use strict";
// src/app.ts
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
        this.setup();
    }
    async setup() {
        await this.registerPlugins();
        this.routes();
        await this.connectToDb();
    }
    async registerPlugins() {
        await this.server.register(cors_1.default, {
            origin: ['http://localhost:5173', 'http://localhost:3001']
        });
    }
    routes() {
        this.server.get('/', this.index);
        new Router_1.MainRoutes(this.server);
    }
    async index(request, reply) {
        reply.send({ message: '🚀 API Online: Seja bem-vindo!' });
    }
    async connectToDb() {
        await (0, database_1.connectToDb)();
    }
    async start() {
        const port = Number(process.env.PORT || 3000);
        try {
            await this.server.listen({ port, host: '0.0.0.0' });
            console.log(`✅ Server is running on http://localhost:${port}`);
        }
        catch (err) {
            console.error('❌ Failed to start server:', err);
            process.exit(1);
        }
    }
}
const app = new App();
app.start();
