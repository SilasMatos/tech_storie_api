import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', error);
  }
};

export default sequelize;
