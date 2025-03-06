import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    reply.status(401).send({ msg: 'Acesso negado!' });
    return;
  }

  try {
    const secret = process.env.SECRET;
    if (!secret) {
      throw new Error('SECRET não definido no arquivo .env');
    }
    const decoded = jwt.verify(token, secret);
    request.user = decoded;
  } catch (err) {
    reply.status(400).send({ msg: 'Token inválido!' });
  }
};