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
    this.server.register(cors, {
      origin: ['http://localhost:5173', 'http://localhost:3001'],
    });
    this.routes();
    this.connectToDb();
  }

  private routes() {
    this.server.get('/', this.index); // Rota principal
    new MainRoutes(this.server); // Registra as rotas principais
  }

  private async index(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: '🚀 API Online: Seja bem-vindo!' });
  }

  private async connectToDb() {
    try {
      await connectToDb();
      console.log('✅ Connected to the database');
    } catch (error) {
      console.error('❌ Error connecting to the database:', error);
    }
  }

  public start() {
    const port = Number(process.env.PORT || 3000);
    this.server.listen(
      { port, host: '0.0.0.0' },
      (err, address) => {
        if (err) {
          console.error('❌ Failed to start server:', err);
          process.exit(1);
        }
        console.log(`✅ Server is running on ${address}`);
      }
    );
  }
}

const app = new App();
app.start();