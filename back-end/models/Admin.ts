import { Table, Column, Model, DataType } from 'sequelize-typescript';
import 'reflect-metadata';

@Table({
  tableName: 'admins',
  timestamps: false,
})
export class Admin extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string; // Stockera le mot de passe chiffré
}