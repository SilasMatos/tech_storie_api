import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../model/UserSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserParams {
  id: string;
}

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  birthdate: Date;
  role: string;
  phone: string;
  username: string;
  typeuser: 'admin' | 'employee';
}

interface LoginBody {
  email: string;
  password: string;
}

export default class UserController {
  static async getUserById(request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) {
    try {
      const id = request.params.id;
      const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
      if (!user) {
        reply.status(404).send({ msg: 'Usuário não encontrado!' });
        return;
      }
      reply.send({ user });
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }

  static async registerUser(request: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) {
    try {
      const { name, email, password, confirmpassword, birthdate, role, phone, username, typeuser } = request.body;
      if (!name || !email || !password || password !== confirmpassword || !birthdate || !role || !phone || !username || !typeuser) {
        reply.status(422).send({ msg: 'Dados inválidos!' });
        return;
      }
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        reply.status(422).send({ msg: 'Esse email já existe!' });
        return;
      }
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: passwordHash, birthdate, role, phone, username, typeuser });
      reply.status(201).send({ status: 201, msg: 'Usuario criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }

  static async loginUser(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        reply.status(422).send({ status: 422, msg: 'Dados inválidos!' });
        return;
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        reply.status(404).send({ status: 404, msg: 'Usuario não encontrado!' });
        return;
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        reply.status(422).send({ status: 422, msg: 'Senha Inválida!' });
        return;
      }
      const secret = process.env.SECRET;
      if (!secret) {
        throw new Error('SECRET não definido no arquivo .env');
      }
      const token = jwt.sign({ id: user.id }, secret);
      reply.send({ status: 201, msg: 'Autenticação realizada com sucesso!', token });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }
}