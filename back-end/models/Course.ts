import { Table, Column, Model, DataType } from 'sequelize-typescript';
import 'reflect-metadata';

@Table
export class Course extends Model { //Create Course table in the backend to link it to the table already created in the database
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare topic: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare date: Date;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare hour: string;
}
