"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const UserController_1 = __importDefault(require("../controllers/UserController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
class UserRoutes {
    constructor(fastify) {
        fastify.route({
            method: 'GET',
            url: '/users/:id',
            handler: UserController_1.default.getUserById,
            preHandler: [authMiddleware_1.authMiddleware]
        });
        fastify.route({
            method: 'POST',
            url: '/register',
            handler: UserController_1.default.registerUser
        });
        fastify.route({
            method: 'POST',
            url: '/login',
            handler: UserController_1.default.loginUser
        });
    }
}
exports.UserRoutes = UserRoutes;
