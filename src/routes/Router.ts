import { FastifyInstance } from 'fastify';
import { UserRoutes } from './RoutesUser';
import { ProductRoutes } from './RouterProduct';
export class MainRoutes {
  constructor(fastify: FastifyInstance) {
    new UserRoutes(fastify);
    new ProductRoutes(fastify);
  }
}
