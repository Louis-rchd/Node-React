import { Table, Column, Model, DataType } from 'sequelize-typescript';
import 'reflect-metadata';

@Table
export class Teacher extends Model { //Create Teacher table in the backend to link it to the table already created in the database
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
