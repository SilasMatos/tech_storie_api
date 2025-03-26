"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../configs/database"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    supplier: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Supplier',
            key: 'id',
        },
        allowNull: false,
    },
    createdby: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
        },
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Product',
    tableName: 'Product',
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    timestamps: true,
});
exports.default = Product;
