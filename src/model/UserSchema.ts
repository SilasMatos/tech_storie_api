import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public birthdate!: Date;
  public role!: string;
  public phone!: string;
  public username!: string;
  public typeuser!: 'admin' | 'employee';
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeuser: {
    type: DataTypes.ENUM('admin', 'employee'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'User',
  timestamps: true,
  createdAt: 'createdat',
  updatedAt: 'updatedat',

});

export default User;