"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    static async getUserById(request, reply) {
        try {
            const id = request.params.id;
            const user = await UserSchema_1.default.findByPk(id, { attributes: { exclude: ['password'] } });
            if (!user) {
                reply.status(404).send({ msg: 'Usuário não encontrado!' });
                return;
            }
            reply.send({ user });
        }
        catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            reply.status(500).send({ msg: 'Erro no servidor' });
        }
    }
    static async registerUser(request, reply) {
        try {
            const { name, email, password, confirmpassword, birthdate, role, phone, username, typeuser } = request.body;
            if (!name || !email || !password || password !== confirmpassword || !birthdate || !role || !phone || !username || !typeuser) {
                reply.status(422).send({ msg: 'Dados inválidos!' });
                return;
            }
            const userExists = await UserSchema_1.default.findOne({ where: { email } });
            if (userExists) {
                reply.status(422).send({ msg: 'Esse email já existe!' });
                return;
            }
            const salt = await bcrypt_1.default.genSalt(12);
            const passwordHash = await bcrypt_1.default.hash(password, salt);
            const user = await UserSchema_1.default.create({ name, email, password: passwordHash, birthdate, role, phone, username, typeuser });
            reply.status(201).send({ status: 201, msg: 'Usuario criado com sucesso!' });
        }
        catch (error) {
            console.error('Erro ao registrar usuário:', error);
            reply.status(500).send({ msg: 'Erro no servidor' });
        }
    }
    static async loginUser(request, reply) {
        try {
            const { email, password } = request.body;
            if (!email || !password) {
                reply.status(422).send({ status: 422, msg: 'Dados inválidos!' });
                return;
            }
            const user = await UserSchema_1.default.findOne({ where: { email } });
            if (!user) {
                reply.status(404).send({ status: 404, msg: 'Usuario não encontrado!' });
                return;
            }
            const checkPassword = await bcrypt_1.default.compare(password, user.password);
            if (!checkPassword) {
                reply.status(422).send({ status: 422, msg: 'Senha Inválida!' });
                return;
            }
            const secret = process.env.SECRET;
            if (!secret) {
                throw new Error('SECRET não definido no arquivo .env');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secret);
            reply.send({ status: 201, msg: 'Autenticação realizada com sucesso!', token });
        }
        catch (error) {
            console.error('Erro ao realizar login:', error);
            reply.status(500).send({ msg: 'Erro no servidor' });
        }
    }
}
exports.default = UserController;
