"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.update = exports.getOne = exports.getAll = exports.create = void 0;
const ProductSchema_1 = __importDefault(require("../model/ProductSchema"));
const SupplierSchema_1 = __importDefault(require("../model/SupplierSchema"));
const UserSchema_1 = __importDefault(require("../model/UserSchema"));
async function create(request, reply) {
    try {
        const data = request.body;
        data.createdby = request.user.id;
        const newProduct = await ProductSchema_1.default.create(data);
        reply.send(newProduct);
    }
    catch (error) {
        console.error('Erro ao criar produto:', error);
        reply.status(500).send({ msg: 'Erro no servidor' });
    }
}
exports.create = create;
async function getAll(request, reply) {
    try {
        const products = await ProductSchema_1.default.findAll();
        reply.send(products);
    }
    catch (error) {
        console.error('Erro ao buscar produtos:', error);
        reply.status(500).send({ msg: 'Erro no servidor' });
    }
}
exports.getAll = getAll;
async function getOne(request, reply) {
    try {
        const id = request.params.id;
        const product = await ProductSchema_1.default.findByPk(id, {
            include: [
                { model: UserSchema_1.default, as: 'createdby', attributes: ['name', 'email'] },
                { model: SupplierSchema_1.default, as: 'supplier', attributes: ['name'] }
            ]
        });
        if (!product) {
            reply.status(404).send({ msg: 'Produto não encontrado!' });
            return;
        }
        reply.send(product);
    }
    catch (error) {
        console.error('Erro ao buscar produto:', error);
        reply.status(500).send({ msg: 'Erro no servidor' });
    }
}
exports.getOne = getOne;
async function update(request, reply) {
    try {
        const id = request.params.id;
        const data = request.body;
        const [updated] = await ProductSchema_1.default.update(data, {
            where: { id },
            returning: true,
        });
        if (!updated) {
            reply.status(404).send({ msg: 'Produto não encontrado!' });
            return;
        }
        const updatedProduct = await ProductSchema_1.default.findByPk(id);
        reply.send(updatedProduct);
    }
    catch (error) {
        console.error('Erro ao atualizar produto:', error);
        reply.status(500).send({ msg: 'Erro no servidor' });
    }
}
exports.update = update;
async function deleteProduct(request, reply) {
    try {
        const id = request.params.id;
        const deleted = await ProductSchema_1.default.destroy({ where: { id } });
        if (!deleted) {
            reply.status(404).send({ msg: 'Produto não encontrado!' });
            return;
        }
        reply.send({ msg: 'Produto deletado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao deletar produto:', error);
        reply.status(500).send({ msg: 'Erro no servidor' });
    }
}
exports.deleteProduct = deleteProduct;
