import { FastifyInstance } from 'fastify';
import * as ProductController from '../controllers/ProductController';
import { authMiddleware } from '../middleware/authMiddleware';

export class ProductRoutes {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      method: 'POST',
      url: '/products',
      handler: ProductController.create,
      preHandler: [authMiddleware]
    });

    fastify.route({
      method: 'GET',
      url: '/products',
      handler: ProductController.getAll,
      preHandler: [authMiddleware]
    });

    fastify.route({
      method: 'GET',
      url: '/products/:id',
      handler: ProductController.getOne,
      preHandler: [authMiddleware]
    });

    fastify.route({
      method: 'PUT',
      url: '/products/:id',
      handler: ProductController.update,
      preHandler: [authMiddleware]
    });

    fastify.route({
      method: 'DELETE',
      url: '/products/:id',
      handler: ProductController.deleteProduct,
      preHandler: [authMiddleware]
    });
  }
}