import { Table, Column, Model, DataType } from 'sequelize-typescript';
import 'reflect-metadata';

@Table({
  tableName: 'students',
  timestamps: true,
})
export class Student extends Model {
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
  declare class: string;
}
