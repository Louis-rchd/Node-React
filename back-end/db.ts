import { Sequelize } from 'sequelize-typescript';
import { Student } from './models/Student';
import { Teacher } from './models/Teacher';
import { Course } from './models/Course';
import { Admin } from './models/Admin';
import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME || '',
  username: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || '',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT),
  dialect: 'postgres',
  models: [Student, Teacher, Course],
});
