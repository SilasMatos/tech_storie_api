import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import Product from '../model/ProductSchema';
import Supplier from '../model/SupplierSchema';
import User from '../model/UserSchema';

interface RouteParams extends RouteGenericInterface {
  Params: {
    id: string;
  };
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = request.body as Partial<Product>;
    data.createdby = request.user.id;
    const newProduct = await Product.create(data);
    reply.send(newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    reply.status(500).send({ msg: 'Erro no servidor' });
  }
}

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  try {
    const products = await Product.findAll();
    reply.send(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    reply.status(500).send({ msg: 'Erro no servidor' });
  }
}

export async function getOne(request: FastifyRequest<RouteParams>, reply: FastifyReply) {
  try {
    const id = request.params.id;
    const product = await Product.findByPk(id, {
      include: [
        { model: User, as: 'createdby', attributes: ['name', 'email'] },
        { model: Supplier, as: 'supplier', attributes: ['name'] }
      ]
    });
    if (!product) {
      reply.status(404).send({ msg: 'Produto não encontrado!' });
      return;
    }
    reply.send(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    reply.status(500).send({ msg: 'Erro no servidor' });
  }
}

export async function update(request: FastifyRequest<RouteParams>, reply: FastifyReply) {
  try {
    const id = request.params.id;
    const data = request.body as Partial<Product>;

    const [updated] = await Product.update(data, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      reply.status(404).send({ msg: 'Produto não encontrado!' });
      return;
    }
    const updatedProduct = await Product.findByPk(id);
    reply.send(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    reply.status(500).send({ msg: 'Erro no servidor' });
  }
}

export async function deleteProduct(request: FastifyRequest<RouteParams>, reply: FastifyReply) {
  try {
    const id = request.params.id;
    const deleted = await Product.destroy({ where: { id } });
    if (!deleted) {
      reply.status(404).send({ msg: 'Produto não encontrado!' });
      return;
    }
    reply.send({ msg: 'Produto deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    reply.status(500).send({ msg: 'Erro no servidor' });
  }
}