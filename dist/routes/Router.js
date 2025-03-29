"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoutes = void 0;
const RoutesUser_1 = require("./RoutesUser");
const RouterProduct_1 = require("./RouterProduct");
class MainRoutes {
    constructor(fastify) {
        new RoutesUser_1.UserRoutes(fastify);
        new RouterProduct_1.ProductRoutes(fastify);
    }
}
exports.MainRoutes = MainRoutes;
