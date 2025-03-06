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
      origin: ['http://localhost:5173', 'http://localhost:3001']
    });
    this.routes();
    this.connectToDb();
  }

  private routes() {
    this.server.get('/', this.index);
    new MainRoutes(this.server);
  }

  private async index(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: 'Seja, bem vindo' });
  }

  private async connectToDb() {
    await connectToDb();
  }

  public start() {
    const port = process.env.PORT || 3000;
    this.server.listen(
      {
        port: Number(port),
        host: '0.0.0.0'
      },
      (err, address) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(`Server is running on ${address} ✅`);
      }
    );
  }
}

const app = new App();
app.start();