import { Table, Column, Model, DataType } from 'sequelize-typescript';
import 'reflect-metadata';

@Table
export class Teacher extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare subject: string;
}
