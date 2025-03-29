import { FastifyInstance } from 'fastify';
import SupplierController from '../controllers/SupplierController';
import { authMiddleware } from '../middleware/authMiddleware';

export class SupplierRoutes {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      method: 'POST',
      url: '/suppliers',
      handler: SupplierController.create,
      preHandler: [authMiddleware],
    });

    fastify.route({
      method: 'GET',
      url: '/suppliers',
      handler: SupplierController.getAll,
      preHandler: [authMiddleware],
    });

    fastify.route({
      method: 'GET',
      url: '/suppliers/:id',
      handler: SupplierController.getOne,
      preHandler: [authMiddleware],
    });

    fastify.route({
      method: 'PUT',
      url: '/suppliers/:id',
      handler: SupplierController.update,
      preHandler: [authMiddleware],
    });

    fastify.route({
      method: 'DELETE',
      url: '/suppliers/:id',
      handler: SupplierController.deleteSupplier,
      preHandler: [authMiddleware],
    });
  }
}