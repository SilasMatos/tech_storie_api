import { FastifyInstance } from 'fastify';
import { UserRoutes } from './RoutesUser';
import { ProductRoutes } from './RouterProduct';
import { SupplierRoutes } from './SupplierRoutes';
export class MainRoutes {
  constructor(fastify: FastifyInstance) {
    new UserRoutes(fastify);
    new ProductRoutes(fastify);
    new SupplierRoutes(fastify);
  }
}
