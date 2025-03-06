import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public stock!: number;
  public supplier!: number;
  public createdby!: number;

}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Supplier',
      key: 'id',
    },
    allowNull: false,
  },
  createdby: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'Product',
  tableName: 'Product',
  createdAt: 'createdat',
  updatedAt: 'updatedat',
  timestamps: true,
});

export default Product;