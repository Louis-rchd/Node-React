import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Données temporaires
let students = [
  { id: 1, firstName: 'Jean', lastName: 'Dupont', class: 'Terminale A' },
  { id: 2, firstName: 'Marie', lastName: 'Curie', class: 'Première B' }
];

let teachers = [
  { id: 1, firstName: 'Albert', lastName: 'Einstein', subject: 'Physique' },
  { id: 2, firstName: 'Isaac', lastName: 'Newton', subject: 'Mathématiques' }
];

let courses = [
  { id: 1, name: 'Mathématiques', code: 'MATH101', topic: 'Algebra', date: '2024-01-10', hour: '09:00' },
  { id: 2, name: 'Physique', code: 'PHY101', topic: 'Mechanics', date: '2024-01-12', hour: '10:00' }
];

// Générateur d'ID
let idCounter = 3;
function generateId() {
  return idCounter++;
}

// Routes pour les étudiants
app.get('/api/students', (req: Request, res: Response) => {
  res.json(students);
});

app.post('/api/students', (req: Request, res: Response) => {
  const { firstName, lastName, class: studentClass } = req.body;
  const newStudent = { id: generateId(), firstName, lastName, class: studentClass };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.delete('/api/students/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  students = students.filter((student) => student.id !== id);
  res.status(204).send();
});

// Routes pour les enseignants
app.get('/api/teachers', (req: Request, res: Response) => {
  res.json(teachers);
});

app.post('/api/teachers', (req: Request, res: Response) => {
  const { firstName, lastName, subject } = req.body;
  const newTeacher = { id: generateId(), firstName, lastName, subject };
  teachers.push(newTeacher);
  res.status(201).json(newTeacher);
});

app.delete('/api/teachers/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  teachers = teachers.filter((teacher) => teacher.id !== id);
  res.status(204).send();
});

// Routes pour les cours
app.get('/api/courses', (req: Request, res: Response) => {
  res.json(courses);
});

app.post('/api/courses', (req: Request, res: Response) => {
  const { name, code, topic, date, hour } = req.body;
  const newCourse = { id: generateId(), name, code, topic, date, hour };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.delete('/api/courses/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  courses = courses.filter((course) => course.id !== id);
  res.status(204).send();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue dans l\'API de gestion de l\'école !');
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});



