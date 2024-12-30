import { Table, Column, Model, DataType, AllowNull, Unique } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

interface AdminCreationAttributes { //Create Admin table in the backend to link it to the table already created in the database
    username: string;
    password: string;
}

@Table({
  tableName: 'admins',
  timestamps: true,
})
export class Admin extends Model<Admin, AdminCreationAttributes> {
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare username: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    declare password: string;
  
    async validatePassword(password: string): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
    }
  
    static async hashPassword(password: string): Promise<string> {
      return await bcrypt.hash(password, 10);
    }
}