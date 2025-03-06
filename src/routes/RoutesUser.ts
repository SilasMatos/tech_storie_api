import { FastifyInstance } from 'fastify';
import UserController from '../controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

export class UserRoutes {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      method: 'GET',
      url: '/users/:id',
      handler: UserController.getUserById,
      preHandler: [authMiddleware]
    });

    fastify.route({
      method: 'POST',
      url: '/register',
      handler: UserController.registerUser
    });

    fastify.route({
      method: 'POST',
      url: '/login',
      handler: UserController.loginUser
    });
  }
}
