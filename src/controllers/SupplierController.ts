import { FastifyRequest, FastifyReply } from 'fastify';
import Supplier from '../model/SupplierSchema';

export default class SupplierController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, contactInfo } = request.body as { name: string; contactInfo: string };
      const newSupplier = await Supplier.create({ name, contactInfo });
      reply.status(201).send(newSupplier);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }

  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const suppliers = await Supplier.findAll();
      reply.send(suppliers);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }

  static async getOne(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        reply.status(404).send({ msg: 'Fornecedor não encontrado!' });
        return;
      }
      reply.send(supplier);
    } catch (error) {
      console.error('Erro ao buscar fornecedor:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }

  static async update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const { name, contactInfo } = request.body as { name: string; contactInfo: string };
      const [updated] = await Supplier.update({ name, contactInfo }, { where: { id } });
      if (!updated) {
        reply.status(404).send({ msg: 'Fornecedor não encontrado!' });
        return;
      }
      const updatedSupplier = await Supplier.findByPk(id);
      reply.send(updatedSupplier);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }

  static async deleteSupplier(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const deleted = await Supplier.destroy({ where: { id } });
      if (!deleted) {
        reply.status(404).send({ msg: 'Fornecedor não encontrado!' });
        return;
      }
      reply.send({ msg: 'Fornecedor deletado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar fornecedor:', error);
      reply.status(500).send({ msg: 'Erro no servidor' });
    }
  }
}