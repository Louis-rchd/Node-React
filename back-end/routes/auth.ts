import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';

const router = express.Router();

// Créer un administrateur (inscription)
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await Admin.create({ email, password: hashedPassword });
  res.status(201).json({ message: 'Admin créé avec succès', admin: newAdmin });
});

// Connexion d'un administrateur
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ message: 'Connexion réussie', token });
});

export default router;
