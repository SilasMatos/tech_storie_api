import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';

class Supplier extends Model {
  public id!: number;
  public name!: string;
  public contactInfo!: string;
  public createdat!: Date;
  public updatedat!: Date;
}

Supplier.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Supplier',
  tableName: 'Supplier',
  timestamps: true,
});

export default Supplier;