import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db';
import { Student } from './models/Student';
import { Teacher } from './models/Teacher';
import { Course } from './models/Course';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync({ alter: true }).then(() => {
  console.log('Base de données synchronisée.');
  app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
  });
}).catch((error) => {
  console.error('Erreur lors de la synchronisation de la base de données :', error);
});

// Générateur d'ID
let idCounter = 3;
function generateId() {
  return idCounter++;
}

// Routes pour les étudiants
app.get('/api/students', async (req: Request, res: Response) => {
  const students = await Student.findAll();
  res.json(students);
});

app.post('/api/students', async (req: Request, res: Response) => {
  const { firstName, lastName, class: studentClass } = req.body;
  const newStudent = await Student.create({ firstName, lastName, class: studentClass });
  res.status(201).json(newStudent);
});

app.delete('/api/students/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await Student.destroy({where: {id}});
  res.status(204).send();
});

// Routes pour les enseignants
app.get('/api/teachers', async (req: Request, res: Response) => {
  const teachers = await Teacher.findAll();
  res.json(teachers);
});

app.post('/api/teachers', async (req: Request, res: Response) => {
  const { firstName, lastName, subject } = req.body;
  const newTeacher = await Teacher.create({ firstName, lastName, subject });
  res.status(201).json(newTeacher);
});

app.delete('/api/teachers/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await Teacher.destroy({where: {id}})
  res.status(204).send();
});

// Routes pour les cours
app.get('/api/courses', async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  res.json(courses);
});

app.post('/api/courses', async (req: Request, res: Response) => {
  const { name, code, topic, date, hour } = req.body;
  const newCourse = await Course.create({name, code, topic, date, hour });
  res.status(201).json(newCourse);
});

app.delete('/api/courses/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await Course.destroy({where: {id}});
  res.status(204).send();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue dans l\'API de gestion de l\'école !');
});

// Démarrage du serveur
/*app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});*/



