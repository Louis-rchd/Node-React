import express, { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import { Express } from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db';
import { Student } from './models/Student';
import { Teacher } from './models/Teacher';
import { Course } from './models/Course';
import { setupSwagger } from './swagger';
import { Admin } from './models/Admin';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

setupSwagger(app);

sequelize.sync({ alter: true }).then(() => {
  console.log('Base de données synchronisée.');
  app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
  });
}).catch((error) => {
  console.error('Erreur lors de la synchronisation de la base de données :', error);
});

/*const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Route d'inscription
app.post('/api/admin/register', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    // Vérifiez si l'admin existe déjà
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Cet administrateur existe déjà' });
    }

    // Hachez le mot de passe
    const hashedPassword = await Admin.hashPassword(password);

    // Créez le nouvel admin
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Administrateur créé avec succès' });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

app.post('/api/admin/login', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // Trouvez l'admin
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Vérifiez le mot de passe
    const isMatch = await admin.validatePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Générez un token JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);*/

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Getting all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   class:
 *                     type: string
 */
app.get('/api/students', async (req: Request, res: Response) => {
  const students = await Student.findAll();
  res.json(students);
});

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created with success
 */
app.post('/api/students', async (req: Request, res: Response) => {
  const { firstName, lastName, class: studentClass } = req.body;
  const newStudent = await Student.create({ firstName, lastName, class: studentClass });
  res.status(201).json(newStudent);
});

/**
 * @swagger
 * /api/students/:id:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       204:
 *         description: Student deleted with success
 */
app.delete('/api/students/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await Student.destroy({where: {id}});
  res.status(204).send();
});

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Getting all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   class:
 *                     type: string
 */
app.get('/api/teachers', async (req: Request, res: Response) => {
  const teachers = await Teacher.findAll();
  res.json(teachers);
});

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher created with success
 */
app.post('/api/teachers', async (req: Request, res: Response) => {
  const { firstName, lastName, subject } = req.body;
  const newTeacher = await Teacher.create({ firstName, lastName, subject });
  res.status(201).json(newTeacher);
});
/**
 * @swagger
 * /api/teachers/:id:
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       204:
 *         description: Teacher deleted with success
 */
app.delete('/api/teachers/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await Teacher.destroy({where: {id}})
  res.status(204).send();
});

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Getting all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   class:
 *                     type: string
 */
app.get('/api/courses', async (req: Request, res: Response) => {
  const courses = await Course.findAll();
  res.json(courses);
});

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created with success
 */
app.post('/api/courses', async (req: Request, res: Response) => {
  const { name, code, topic, date, hour } = req.body;
  const newCourse = await Course.create({name, code, topic, date, hour });
  res.status(201).json(newCourse);
});

/**
 * @swagger
 * /api/courses/:id:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               class:
 *                 type: string
 *     responses:
 *       204:
 *         description: Course deleted with success
 */
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



