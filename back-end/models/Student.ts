import { Table, Column, Model, DataType } from 'sequelize-typescript';
import 'reflect-metadata';

@Table({
  tableName: 'students',
  timestamps: true,
})
export class Student extends Model { //Create Student table in the backend to link it to the table already created in the database
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
