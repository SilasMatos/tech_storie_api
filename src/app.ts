// src/app.ts

import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import 'dotenv/config';
import { MainRoutes } from './routes/Router';
import cors from '@fastify/cors';
import { connectToDb } from './configs/database';
class App {
  private server: FastifyInstance;

  constructor() {
    this.server = fastify();
    this.setup();
  }

  private async setup() {
    await this.registerPlugins();
    this.routes(); // Registra as rotas antes de iniciar o servidor
    await this.connectToDb();
  }

  private async registerPlugins() {
    await this.server.register(cors, {
      origin: ['http://localhost:5173', 'http://localhost:3001'],
    });
  }

  private routes() {
    this.server.get('/', this.index); // Rota principal
    new MainRoutes(this.server); // Registra as rotas principais
  }

  private async index(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: '🚀 API Online: Seja bem-vindo!' });
  }

  private async connectToDb() {
    await connectToDb();
  }

  public async start() {
    const port = Number(process.env.PORT || 3000);
    try {
      await this.server.listen({ port, host: '0.0.0.0' });
      console.log(`✅ Server is running on http://localhost:${port}`);
    } catch (err) {
      console.error('❌ Failed to start server:', err);
      process.exit(1);
    }
  }
}

const app = new App();
app.start();