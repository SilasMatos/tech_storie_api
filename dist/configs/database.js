"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao PostgreSQL com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro ao conectar ao PostgreSQL:', error);
    }
};
exports.connectToDb = connectToDb;
exports.default = sequelize;
